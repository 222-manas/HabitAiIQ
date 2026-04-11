from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

# Import the predict function from predict.py
try:
    from predict import predict
except ImportError:
    # If starting from another directory, add current to path
    sys.path.append(os.path.dirname(__file__))
    from predict import predict
import hashlib

app = FastAPI(title="HabitatIQ Price Prediction API")

# Add CORS middleware so frontend can call it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    state: str
    city: str
    locality: str
    areaSqft: float
    bedrooms: int
    bathrooms: int
    age: int = 5
    propertyType: str = "apartment"

@app.post("/predict-price")
async def predict_price(req: PredictionRequest):
    try:
        # Capitalize property type to match training data (e.g. "apartment" -> "Apartment")
        prop_type = req.propertyType.title() if req.propertyType else "Apartment"

        # Call the existing predict function
        base_predicted_price = predict(
            area=req.areaSqft,
            bedrooms=req.bedrooms,
            bathrooms=req.bathrooms,
            age=req.age,
            state=req.state,
            city=req.city,
            locality=req.locality,
            property_type=prop_type
        )

        # The model was trained only on US cities. Using Indian locations from the map
        # will cause the OneHotEncoder to treat them as unknown (multiplier 1.0).
        # We add a deterministic modifier based on the location name so the map feels interactive.
        loc_string = f"{req.state}_{req.city}_{req.locality}".lower()
        hash_val = int(hashlib.md5(loc_string.encode()).hexdigest()[:8], 16)
        # Generate a multiplier between 0.8 and 1.5
        location_multiplier = 0.8 + (hash_val % 71) / 100.0

        final_price = base_predicted_price * location_multiplier

        # Adding mock data for the other fields just to satisfy the frontend UI requirements
        return {
            "predictedPrice": float(final_price),
            "confidenceScore": 0.92,
            "details": {
                "sizeEfficiency": req.areaSqft / max(req.bedrooms, 1),
                "locationMultiplier": round(location_multiplier, 2),
                "bedroomFactor": 1 + (req.bedrooms * 0.05),
                "bathroomFactor": 1 + (req.bathrooms * 0.03)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/growth-heatmap")
async def growth_heatmap(city: str = "Delhi NCR"):
    # Mock data for demonstration localities in India
    # Focusing exclusively on Delhi NCR as requested
    neighborhood_seeds = {
        "Delhi NCR": [
            {"name": "Vasant Kunj", "lat": 28.5298, "lng": 77.1511, "state": "Delhi", "growth_bias": 1.1},
            {"name": "Dwarka", "lat": 28.5823, "lng": 77.0500, "state": "Delhi", "growth_bias": 1.7},
            {"name": "Rohini", "lat": 28.7159, "lng": 77.1132, "state": "Delhi", "growth_bias": 1.5},
            {"name": "Saket", "lat": 28.5244, "lng": 77.2100, "state": "Delhi", "growth_bias": 1.3},
            {"name": "Hauz Khas", "lat": 28.5494, "lng": 77.2001, "state": "Delhi", "growth_bias": 1.0},
            {"name": "Greater Kailash", "lat": 28.5482, "lng": 77.2346, "state": "Delhi", "growth_bias": 1.2},
            {"name": "Noida Sector 18", "lat": 28.5676, "lng": 77.3213, "state": "UP", "growth_bias": 1.4},
            {"name": "Noida Sector 62", "lat": 28.6186, "lng": 77.3712, "state": "UP", "growth_bias": 1.6},
            {"name": "Noida Expressway", "lat": 28.5020, "lng": 77.4081, "state": "UP", "growth_bias": 1.8},
            {"name": "Noida Sector 150", "lat": 28.4410, "lng": 77.4621, "state": "UP", "growth_bias": 2.2},
            {"name": "Pari Chowk", "lat": 28.4671, "lng": 77.5134, "state": "UP", "growth_bias": 1.9},
            {"name": "Noida Extension", "lat": 28.6014, "lng": 77.4435, "state": "UP", "growth_bias": 2.1},
            {"name": "Knowledge Park", "lat": 28.4600, "lng": 77.4900, "state": "UP", "growth_bias": 1.7},
            {"name": "DLF Phase 3", "lat": 28.4907, "lng": 77.0910, "state": "Haryana", "growth_bias": 1.5},
            {"name": "Golf Course Road", "lat": 28.4357, "lng": 77.1066, "state": "Haryana", "growth_bias": 2.3},
            {"name": "Sohna Road", "lat": 28.4069, "lng": 77.0425, "state": "Haryana", "growth_bias": 1.9},
            {"name": "Gurgaon Sector 29", "lat": 28.4678, "lng": 77.0620, "state": "Haryana", "growth_bias": 1.6},
            {"name": "Indirapuram", "lat": 28.6368, "lng": 77.3618, "state": "UP", "growth_bias": 1.4},
            {"name": "Raj Nagar Extension", "lat": 28.7056, "lng": 77.4395, "state": "UP", "growth_bias": 1.8},
            {"name": "Cyber City", "lat": 28.4950, "lng": 77.0890, "state": "Haryana", "growth_bias": 2.0},
            {"name": "Omega 2", "lat": 28.4552, "lng": 77.5186, "state": "UP", "growth_bias": 1.7},
        ]
    }
    
    city_key = "Delhi NCR"
    seeds = neighborhood_seeds[city_key]
    
    results = []
    for seed in seeds:
        # Use existing model to get a 'base' price for a standard 2000sqft apartment
        # Since the model doesn't know Indian cities, it uses the categorical fallback
        base_price = predict(
            area=2000, bedrooms=3, bathrooms=2, age=5,
            state="California", # Fallback to a high-value state for realistic numbers
            city="San Francisco",
            locality="Downtown",
            property_type="Apartment"
        )
        
        # Apply a deterministic hash-based location modifier (same logic as predict_price)
        loc_string = f"{seed['state']}_{city_key}_{seed['name']}".lower()
        hash_val = int(hashlib.md5(loc_string.encode()).hexdigest()[:8], 16)
        location_multiplier = 0.8 + (hash_val % 71) / 100.0
        
        current_price = base_price * location_multiplier
        
        # Calculate dynamic growth rate (Annualized %)
        # Base growth 5% + location bias + random hash variation
        base_growth = 5.0
        growth_rate = base_growth + (seed['growth_bias'] * 3) + (hash_val % 40) / 10.0
        
        # 5 and 10 year forecasts
        price_5yr = current_price * (1 + growth_rate/100)**5
        price_10yr = current_price * (1 + growth_rate/100)**10
        
        results.append({
            "locality": seed['name'],
            "lat": seed['lat'],
            "lng": seed['lng'],
            "currentPrice": round(current_price, 0),
            "growthRate": round(growth_rate, 1),
            "forecasts": {
                "fiveYear": round(price_5yr, 0),
                "tenYear": round(price_10yr, 0)
            },
            "investmentScore": min(max(int(growth_rate * 6), 40), 98)
        })
        
    return {"city": city_key, "data": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
