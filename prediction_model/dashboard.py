import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import os

# Set page configuration for a premium feel
st.set_page_config(
    page_title="HabitatIQ | Property Analytical Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for modern styling
st.markdown("""
    <style>
    .main {
        background-color: #0e1117;
    }
    .stMetric {
        background-color: #1e2130;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #3d4455;
    }
    h1, h2, h3 {
        color: #ffffff;
    }
    </style>
""", unsafe_allow_html=True)

@st.cache_data
def load_data():
    csv_path = os.path.join(os.path.dirname(__file__), 'raw_sales.csv')
    if not os.path.exists(csv_path):
        return None
    df = pd.read_csv(csv_path)
    df['datesold'] = pd.to_datetime(df['datesold'])
    df['year'] = df['datesold'].dt.year
    df['month'] = df['datesold'].dt.month
    return df

def main():
    st.title("🏙️ HabitatIQ Live Property Analytics")
    st.markdown("---")

    df = load_data()
    if df is None:
        st.error("Dataset 'raw_sales.csv' not found. Please ensure it exists in the directory.")
        return

    # Sidebar Filters
    st.sidebar.header("🔍 Filter Options")
    
    unique_years = sorted(df['year'].unique())
    year_range = st.sidebar.slider("Select Year Range", 
                                   min_value=int(min(unique_years)), 
                                   max_value=int(max(unique_years)), 
                                   value=(int(min(unique_years)), int(max(unique_years))))

    property_types = st.sidebar.multiselect("Select Property Types", 
                                            options=df['propertyType'].unique(),
                                            default=df['propertyType'].unique())

    bedroom_count = st.sidebar.multiselect("Select Bedroom Count", 
                                           options=sorted(df['bedrooms'].unique()),
                                           default=sorted(df['bedrooms'].unique()))

    # Filtered Data
    mask = (df['year'] >= year_range[0]) & \
           (df['year'] <= year_range[1]) & \
           (df['propertyType'].isin(property_types)) & \
           (df['bedrooms'].isin(bedroom_count))
    
    df_filtered = df[mask]

    # Key Metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Sales", f"{len(df_filtered):,}")
    with col2:
        st.metric("Average Price", f"${df_filtered['price'].mean():,.0f}")
    with col3:
        st.metric("Max Price", f"${df_filtered['price'].max():,.0f}")
    with col4:
        st.metric("Top Postcode", df_filtered['postcode'].mode().iloc[0] if not df_filtered.empty else "N/A")

    st.markdown("###")

    # Layout: Heatmap and Trends
    row1_col1, row1_col2 = st.columns([1, 1])

    with row1_col1:
        st.subheader("📊 Correlation Matrix")
        # Prepare data for correlation
        df_corr = df_filtered.copy()
        df_corr['propertyType_code'] = df_corr['propertyType'].astype('category').cat.codes
        corr_matrix = df_corr[['price', 'bedrooms', 'year', 'propertyType_code']].corr()
        
        fig_corr = px.imshow(corr_matrix,
                             text_auto=".2f",
                             aspect="auto",
                             color_continuous_scale='RdBu_r',
                             labels=dict(color="Correlation"))
        fig_corr.update_layout(plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)')
        st.plotly_chart(fig_corr, use_container_width=True)

    with row1_col2:
        st.subheader("📈 Price Trend over Years")
        trend_df = df_filtered.groupby(['year', 'propertyType'])['price'].mean().reset_index()
        fig_trend = px.line(trend_df, x='year', y='price', color='propertyType',
                            markers=True, template="plotly_dark")
        fig_trend.update_layout(xaxis_title="Year", yaxis_title="Average Price ($)")
        st.plotly_chart(fig_trend, use_container_width=True)

    # Row 2: Scatter Matrix
    st.subheader("🌌 Feature Relationship Matrix (Scatter Matrix)")
    st.markdown("Explore how bedrooms and property types impact price.")
    
    # Sample for performance if needed
    sample_df = df_filtered.sample(min(2000, len(df_filtered))) if len(df_filtered) > 2000 else df_filtered
    
    fig_scatter = px.scatter_matrix(sample_df,
                                    dimensions=['price', 'bedrooms', 'year'],
                                    color='propertyType',
                                    opacity=0.5,
                                    template="plotly_dark",
                                    labels={col: col.replace('_', ' ').title() for col in sample_df.columns})
    fig_scatter.update_layout(height=700)
    st.plotly_chart(fig_scatter, use_container_width=True)

    st.markdown("---")
    st.caption("HabitatIQ AI Analytics | Internal Use Only")

if __name__ == "__main__":
    main()
