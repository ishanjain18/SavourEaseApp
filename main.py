import copy
import json
import numpy as np
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
    total_time: int = 0
    servings: int = 0
    course: str = ""
    diet: str = ""
    cuisine: str = ""
    

app = FastAPI()

df = pd.read_csv('data.csv', encoding='utf-8')
encoded_df = pd.read_csv('encoded.csv')

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
    min_freq = 15
    unique_ingredients = dict(filter(lambda x : x[1] > min_freq, unique_ingredients.items()))

    return {"ingredients": unique_ingredients}

@app.get("/search")
def get_suggestions():
    return df['RecipeName'].tolist()


@app.get('/recommendations')
def get_recommendations(form: FormInput):

    # build form input into a encoded vector

    # 1. by similar dish 
    # 2. by course 
    # 3. by diet
    # 4. by cuisine
    # 5. by ingredients

    max_time = 2925
    min_time = 0
    max_serving = 1000
    min_serving = 1

    input_vector = []
    # Normalizing Servings and Total time columns
    input_vector.append((form.servings - min_serving) / (max_serving - min_serving))
    input_vector.append((form.total_time - min_time) / (max_time - min_time))

    input_vectors = [copy.deepcopy(input_vector) for i in range(5)]
    
    input_lists = [
        form.ingredients + [form.course] + [form.diet] + [form.cuisine],
        [form.course], 
        [form.diet],
        [form.cuisine],
        form.ingredients,
        ]
    
    response = {}
    
    for i, category in enumerate(['similar dish','course','diet','cuisine','ingredients']):
        
        for col in encoded_df.columns[2:]:
        # If the column is in the input list, set its value to 1, otherwise set it to 0
            input_vectors[i].append(int(col in input_lists[i]))   

        similarity = cosine_similarity(encoded_df.to_numpy(), np.array(input_vectors[i]).reshape(1, -1))

        sorted_indices = similarity.argsort(axis=0)[::-1][:5]

        # Get the indices of the 5 most similar rows
        most_similar_indices = sorted_indices.flatten()

        recommendations = df.iloc[most_similar_indices]

        response[category] = recommendations.to_dict(orient='index')
    
    return response

@app.get('/recipe')
def get_recipe(recipe: Recipe):

    # find recipe by RecipeName and return all recipe data
    row = df.loc[df['RecipeName'] == recipe.recipe_name].iloc[0]
    return row.to_dict()