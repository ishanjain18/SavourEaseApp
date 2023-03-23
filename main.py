from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import ast
from typing import Optional, List

class Recipe(BaseModel): 
    recipe_name : str

class FormInput(BaseModel):
    ingredients: List[str] = []
    total_time: int
    servings: int
    course: str = ""
    diet: str = ""
    

app = FastAPI()

df = pd.read_csv('data.csv')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/ingredients")
def get_ingredients():

    # Creating a dataset of unique ingredients
    unique_ingredients = {}
    
    for ing_list in df['Ingredients']:
        for ingred in ast.literal_eval(ing_list):
            unique_ingredients[ingred] = unique_ingredients.get(ingred, 0) + 1
    
    # filtering ingredients based on frequency in dataset 
    # min_freq = 15
    # unique_ingredients = dict(filter(lambda x : x[1] > min_freq, unique_ingredients.items()))

    return {"ingredients": unique_ingredients}

@app.get("/search")
def get_suggestions():
    return df['RecipeName'].tolist()


@app.get('/recommendations')
def get_recommendations(form: FormInput):
    return form

@app.get('/recipe')
def get_recipe(recipe: Recipe):

    # find recipe by RecipeName and return all recipe data
    row = df.loc[df['RecipeName'] == recipe.recipe_name].iloc[0]
    return row.to_dict()