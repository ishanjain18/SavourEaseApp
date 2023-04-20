import copy
import numpy as np
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import ast
from typing import List

class Recipe(BaseModel): 
    recipe_name : str

class FormInput(BaseModel):
    ingredients: List[str] = []
    time: int 
    servings: int
    course: List[str] = []
    diet: List[str] = []
    cuisine: List[str] = []
    
# 1. Initialize FastAPI app.
app = FastAPI()

# 2. Loading CSV recipe data into Pandas dataframe.
df = pd.read_csv('./datasets/data.csv')
encoded_df = pd.read_csv('./datasets/encoded.csv')

# 3. Allow all origins to access backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 4. Route to populate the form select input with choices for Diet, Cuisine and Course.
@app.get("/options")
def get_options():

    # Creating a list of unique ingredients
    ingredient_categories = {}
    
    for ing_list in df['Ingredients']:
        for ingred in ast.literal_eval(ing_list):
            ingredient_categories[ingred] = ingredient_categories.get(ingred, 0) + 1
    
    # Filtering ingredients based on frequency in dataset to avoid excess 
    min_freq = 15
    ingredient_categories = dict(filter(lambda x : x[1] > min_freq, ingredient_categories.items()))
    ingredient_categories = dict(sorted(ingredient_categories.items(), key=lambda x: x[1], reverse=True))

    categories = {"ingredients": list(ingredient_categories)}
    for category in ['Diet', 'Cuisine', 'Course']:
        categories[category.lower()] = sorted(df[category].unique().tolist())
    return categories

# 5. Returns list of recipe names to enable autocomplete search bar.
@app.get("/search")
def get_search_options():
    return df['RecipeName'].tolist()

# 6. Apply cosine similarity algorithm to one hot encoded input vector and return recommendations
@app.post('/recommendations')
def fetch_recommendations(form: FormInput):

    # build form input into a one-hot encoded vector
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
    input_vector.append((form.time - min_time) / (max_time - min_time))

    input_vectors = [copy.deepcopy(input_vector) for i in range(5)]
    
    input_lists = [
        form.ingredients + form.course + form.diet + form.cuisine,
        form.course, 
        form.diet,
        form.cuisine,
        form.ingredients,
        ]
    
    response = {}
    
    # Recommendations filtered into 4 categories
    # 1. Similar Dish - All input processed as it is
    # 2. Course/Diet/Cuisine/Ingredients - Muted all input except Course/Diet/Cuisine/Ingredients input respectively
    
    for i, category in enumerate(['similar dish','course','diet','cuisine','ingredients']):
        
        for col in encoded_df.columns[2:]:
        # If the column is in the input list, set its value to 1, otherwise set it to 0
            input_vectors[i].append(int(col in input_lists[i]))   

        similarity = cosine_similarity(encoded_df.to_numpy(), np.array(input_vectors[i]).reshape(1, -1))

        sorted_indices = similarity.argsort(axis=0)[::-1][:6]

        # Get the indices of the 5 most similar rows
        most_similar_indices = sorted_indices.flatten()

        recommendations = df.iloc[most_similar_indices]

        response[category] = recommendations.to_dict(orient='index')
    
    return response

# 7. Route for specific recipe details 
@app.get('/recipe')
def get_recipe(recipe: Recipe):

    # find recipe by RecipeName and return all recipe data
    row = df.loc[df['RecipeName'] == recipe.recipe_name].iloc[0]
    return row.to_dict()