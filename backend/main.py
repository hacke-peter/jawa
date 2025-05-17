'''s'''
import os

from typing                 import Union
from fastapi                import FastAPI
from pydantic               import BaseModel
from services.api_service   import APIClient

api_client = APIClient()

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/test")
async def test():
    api_client.era5_api()
    return {"message": "ok"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}

@app.get("/healthdata/{country}")
def get_health_data_per_country(country: str):
    print("country", country)
    climate_data = {
        "canary_islands": {
            "name": "Canary Islands",
            "description": "The Canary Islands enjoy a year-round spring-like climate with minimal temperature fluctuations. The steady climate is beneficial for many health conditions, especially respiratory issues.",
            "data": [
                {"month":  0, "humidity": 65, "airQuality": 90, "allergens": 20, "temperature": 18},
                {"month":  1, "humidity": 65, "airQuality": 90, "allergens": 25, "temperature": 18},
                {"month":  2, "humidity": 60, "airQuality": 90, "allergens": 35, "temperature": 19},
                {"month":  3, "humidity": 60, "airQuality": 95, "allergens": 45, "temperature": 20},
                {"month":  4, "humidity": 60, "airQuality": 95, "allergens": 40, "temperature": 21},
                {"month":  5, "humidity": 55, "airQuality": 90, "allergens": 30, "temperature": 23},
                {"month":  6, "humidity": 55, "airQuality": 90, "allergens": 25, "temperature": 24},
                {"month":  7, "humidity": 60, "airQuality": 85, "allergens": 20, "temperature": 25},
                {"month":  8, "humidity": 65, "airQuality": 90, "allergens": 25, "temperature": 24},
                {"month":  9, "humidity": 65, "airQuality": 95, "allergens": 30, "temperature": 23},
                {"month": 10, "humidity": 70, "airQuality": 90, "allergens": 25, "temperature": 21},
                {"month": 11, "humidity": 70, "airQuality": 90, "allergens": 20, "temperature": 19},
            ],
        },
        "barcelona": {
            "name": "Barcelona",
            "description": "Barcelona has a Mediterranean climate with moderate humidity year-round. Air quality can be affected by urban pollution, especially in summer. Spring has higher allergen levels due to pollen.",
            "data": [
                {"month":  0, "humidity": 70, "airQuality": 75, "allergens": 15, "temperature": 10},
                {"month":  1, "humidity": 70, "airQuality": 75, "allergens": 20, "temperature": 11},
                {"month":  2, "humidity": 65, "airQuality": 70, "allergens": 45, "temperature": 13},
                {"month":  3, "humidity": 65, "airQuality": 75, "allergens": 65, "temperature": 15},
                {"month":  4, "humidity": 65, "airQuality": 80, "allergens": 70, "temperature": 19},
                {"month":  5, "humidity": 65, "airQuality": 75, "allergens": 50, "temperature": 23},
                {"month":  6, "humidity": 70, "airQuality": 70, "allergens": 35, "temperature": 26},
                {"month":  7, "humidity": 70, "airQuality": 65, "allergens": 30, "temperature": 26},
                {"month":  8, "humidity": 70, "airQuality": 75, "allergens": 35, "temperature": 23},
                {"month":  9, "humidity": 70, "airQuality": 80, "allergens": 30, "temperature": 19},
                {"month": 10, "humidity": 75, "airQuality": 75, "allergens": 20, "temperature": 14},
                {"month": 11, "humidity": 75, "airQuality": 75, "allergens": 15, "temperature": 11},
            ],
        },
        "madrid": {
            "name": "Madrid",
            "description": "Madrid has a continental Mediterranean climate with very hot, dry summers and cool winters. The low humidity in summer is beneficial for respiratory conditions, but high temperatures can be challenging.",
            "data": [
                {"month":  0, "humidity": 65, "airQuality": 70, "allergens": 10, "temperature":  6},
                {"month":  1, "humidity": 60, "airQuality": 70, "allergens": 15, "temperature":  8},
                {"month":  2, "humidity": 55, "airQuality": 65, "allergens": 50, "temperature": 11},
                {"month":  3, "humidity": 50, "airQuality": 70, "allergens": 70, "temperature": 14},
                {"month":  4, "humidity": 45, "airQuality": 75, "allergens": 65, "temperature": 18},
                {"month":  5, "humidity": 40, "airQuality": 65, "allergens": 45, "temperature": 24},
                {"month":  6, "humidity": 35, "airQuality": 60, "allergens": 30, "temperature": 28},
                {"month":  7, "humidity": 35, "airQuality": 55, "allergens": 25, "temperature": 28},
                {"month":  8, "humidity": 40, "airQuality": 65, "allergens": 30, "temperature": 24},
                {"month":  9, "humidity": 50, "airQuality": 75, "allergens": 25, "temperature": 17},
                {"month": 10, "humidity": 60, "airQuality": 70, "allergens": 15, "temperature": 11},
                {"month": 11, "humidity": 65, "airQuality": 70, "allergens": 10, "temperature":  7},
            ],
        },
        "andalusia": {
            "name": "Andalusia",
            "description": "Andalusia has a Mediterranean climate with very hot summers and mild winters. The region has low humidity in summer months which can benefit respiratory conditions, but extreme heat can be challenging.",
            "data": [
                {"month":  0, "humidity": 70, "airQuality": 80, "allergens": 15, "temperature": 12},
                {"month":  1, "humidity": 65, "airQuality": 80, "allergens": 25, "temperature": 13},
                {"month":  2, "humidity": 60, "airQuality": 75, "allergens": 55, "temperature": 16},
                {"month":  3, "humidity": 55, "airQuality": 80, "allergens": 70, "temperature": 18},
                {"month":  4, "humidity": 50, "airQuality": 85, "allergens": 60, "temperature": 22},
                {"month":  5, "humidity": 45, "airQuality": 80, "allergens": 40, "temperature": 27},
                {"month":  6, "humidity": 40, "airQuality": 75, "allergens": 25, "temperature": 31},
                {"month":  7, "humidity": 40, "airQuality": 70, "allergens": 20, "temperature": 31},
                {"month":  8, "humidity": 45, "airQuality": 80, "allergens": 25, "temperature": 27},
                {"month":  9, "humidity": 55, "airQuality": 85, "allergens": 30, "temperature": 22},
                {"month": 10, "humidity": 65, "airQuality": 80, "allergens": 20, "temperature": 16},
                {"month": 11, "humidity": 70, "airQuality": 80, "allergens": 15, "temperature": 13},
            ],
        },
        "valencia": {
            "name": "Valencia",
            "description": "Valencia has a Mediterranean climate with moderate humidity year-round. The coastal location provides good air quality, and the climate is generally favorable for respiratory conditions."
            ,
            "data": [
                {"month":  0, "humidity": 65, "airQuality": 80, "allergens": 15, "temperature": 12},
                {"month":  1, "humidity": 65, "airQuality": 80, "allergens": 25, "temperature": 13},
                {"month":  2, "humidity": 60, "airQuality": 75, "allergens": 50, "temperature": 15},
                {"month":  3, "humidity": 60, "airQuality": 80, "allergens": 65, "temperature": 17},
                {"month":  4, "humidity": 60, "airQuality": 85, "allergens": 60, "temperature": 20},
                {"month":  5, "humidity": 60, "airQuality": 80, "allergens": 45, "temperature": 24},
                {"month":  6, "humidity": 65, "airQuality": 75, "allergens": 30, "temperature": 27},
                {"month":  7, "humidity": 65, "airQuality": 70, "allergens": 25, "temperature": 27},
                {"month":  8, "humidity": 65, "airQuality": 80, "allergens": 30, "temperature": 24},
                {"month":  9, "humidity": 65, "airQuality": 85, "allergens": 25, "temperature": 20},
                {"month": 10, "humidity": 65, "airQuality": 80, "allergens": 20, "temperature": 16},
                {"month": 11, "humidity": 65, "airQuality": 80, "allergens": 15, "temperature": 13},
            ],
        },
        "galicia": {
            "name": "Galicia",
            "description": "Galicia has an Atlantic climate with higher humidity and rainfall. The air quality is excellent due to low pollution, but the high humidity may be challenging for some respiratory conditions.",
            "data": [
                {"month":  0, "humidity": 80, "airQuality": 85, "allergens": 10, "temperature": 10},
                {"month":  1, "humidity": 75, "airQuality": 85, "allergens": 15, "temperature": 11},
                {"month":  2, "humidity": 75, "airQuality": 80, "allergens": 40, "temperature": 13},
                {"month":  3, "humidity": 70, "airQuality": 85, "allergens": 60, "temperature": 14},
                {"month":  4, "humidity": 70, "airQuality": 90, "allergens": 65, "temperature": 16},
                {"month":  5, "humidity": 70, "airQuality": 90, "allergens": 50, "temperature": 19},
                {"month":  6, "humidity": 70, "airQuality": 85, "allergens": 35, "temperature": 21},
                {"month":  7, "humidity": 70, "airQuality": 85, "allergens": 30, "temperature": 21},
                {"month":  8, "humidity": 75, "airQuality": 90, "allergens": 35, "temperature": 20},
                {"month":  9, "humidity": 75, "airQuality": 90, "allergens": 25, "temperature": 17},
                {"month": 10, "humidity": 80, "airQuality": 85, "allergens": 15, "temperature": 13},
                {"month": 11, "humidity": 80, "airQuality": 85, "allergens": 10, "temperature": 11},
            ],
        },
    }
    return climate_data
