from ingredients import ingredients

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

df = pd.read_csv('transformed_data.csv')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/ingredients")
def get_ingredients():
    return {"ingredients": ingredients()}

@app.get("/search")
def get_suggestions():
    return df['remainder__RecipeName'].tolist()