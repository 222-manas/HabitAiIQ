import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

def visualize_data():
    """
    Reads the raw_sales.csv data, processes it, and generates 
    visualization matrices (Correlation Heatmap and Scatter Matrix).
    """
    # Define file paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, 'raw_sales.csv')
    corr_img_path = os.path.join(base_dir, 'correlation_matrix.png')
    scatter_img_path = os.path.join(base_dir, 'scatter_matrix.png')

    if not os.path.exists(csv_path):
        print(f"Error: Could not find {csv_path}")
        return

    print(f"Reading data from {csv_path}...")
    df = pd.read_csv(csv_path)

    # 1. PREPROCESSING
    print("Pre-processing data for analysis...")
    
    # Create a copy for analysis
    df_analysis = df.copy()
    
    # Convert datesold to datetime and extract year/month for correlation
    df_analysis['datesold'] = pd.to_datetime(df_analysis['datesold'])
    df_analysis['sale_year'] = df_analysis['datesold'].dt.year
    df_analysis['sale_month'] = df_analysis['datesold'].dt.month
    
    # Label encode propertyType (House vs Unit/Apartment)
    # This allows it to be included in the correlation matrix
    df_analysis['propertyType_code'] = df_analysis['propertyType'].astype('category').cat.codes
    
    # Ensure bedrooms and price are numeric
    df_analysis['bedrooms'] = pd.to_numeric(df_analysis['bedrooms'], errors='coerce')
    df_analysis['price'] = pd.to_numeric(df_analysis['price'], errors='coerce')
    
    # Drop columns that are no longer needed or are redundant for numeric matrix
    # Keeping postcode as it might have some regional correlation
    numeric_cols = ['price', 'bedrooms', 'postcode', 'sale_year', 'sale_month', 'propertyType_code']
    df_numeric = df_analysis[numeric_cols].dropna()

    # 2. GENERATE CORRELATION MATRIX (HEATMAP)
    print("Generating Correlation Matrix...")
    plt.figure(figsize=(12, 10))
    correlation_matrix = df_numeric.corr()
    
    mask = sns.heatmap(correlation_matrix, 
                       annot=True, 
                       cmap='RdBu_r', 
                       center=0,
                       fmt=".2f", 
                       linewidths=0.5)
    
    plt.title('Property Sales Correlation Matrix', fontsize=18, pad=20)
    plt.tight_layout()
    plt.savefig(corr_img_path, dpi=300)
    print(f"Correlation Matrix saved to: {corr_img_path}")

    # 3. GENERATE SCATTER MATRIX (PAIR PLOT)
    # We take a sample if the dataset is too large to keep performance snappy
    print("Generating Scatter Matrix (Pair Plot)...")
    sample_size = min(1000, len(df_numeric))
    df_sample = df_numeric.sample(n=sample_size, random_state=42)
    
    # Remap propertyType_code back to names for better legend in pairplot
    type_map = dict(enumerate(df_analysis['propertyType'].astype('category').cat.categories))
    df_sample['Property Type'] = df_sample['propertyType_code'].map(type_map)
    
    # Simplified pairplot for key features
    pairplot_features = ['price', 'bedrooms', 'sale_year', 'Property Type']
    g = sns.pairplot(df_sample[pairplot_features], 
                     hue='Property Type', 
                     palette='viridis',
                     diag_kind='kde',
                     plot_kws={'alpha': 0.6})
    
    g.fig.suptitle('Property Sales Feature Relationships (Scatter Matrix)', fontsize=16, y=1.02)
    plt.savefig(scatter_img_path, dpi=300)
    print(f"Scatter Matrix saved to: {scatter_img_path}")

    print("\nVisualization complete! You can now view correlation_matrix.png and scatter_matrix.png.")

if __name__ == "__main__":
    try:
        visualize_data()
    except Exception as e:
        print(f"An error occurred during visualization: {e}")
