# SavourEase

Web application for a food recommendation service.

1. Data Preprocessing - One Hot Encoding
2. Algorithm - Cosine Similarity

Tech Stack - Python (FastAPI), ReactJS, Material-UI, Jupyter Notebook, Scikit-learn, Pandas, Docker

## Deployment Instructions

Clone the project

```bash
  git clone https://github.com/ishanjain18/SavourEaseApp.git
```

Go to the project directory

```bash
  cd SavourEaseApp
```

Start the application using Docker Compose:

```bash
  docker-compose up
```

Navigate to http://localhost:3000 in your web browser to access the application.

## Dataset

6000+ Indian Food Recipes Dataset, taken from [Kaggle](https://www.kaggle.com/datasets/kanishk307/6000-indian-food-recipes-dataset)

## Demo Application

Visit [SavourEase!](https://savourease-prod.vercel.app/)

## Cosine Similarity

Cosine similarity is a metric used to measure the similarity between two non-zero vectors in a space. It is often used in recommendation systems to identify items that are similar to each other based on user preferences or input data.

In this project, cosine similarity is used to recommend recipes based on user input. The input data is transformed into a one-hot encoded vector, and the cosine similarity algorithm is applied to the encoded data to find the most similar recipes.

![Cosine Similarity Visualization](https://github.com/ishanjain18/SavourEaseApp/blob/main/cosine_similarity.png)

The above image shows a scatter plot visualization of cosine similarity between two vectors. As the angle between the two vectors decreases, the cosine similarity score approaches 1, indicating a higher degree of similarity between the vectors.

## One-Hot Encoding

One-hot encoding is a technique used to represent categorical data as numerical data. Each category is assigned a unique integer value, and a binary vector is created for each observation in the dataset, with a value of 1 in the corresponding category column and 0s in all other columns.

In this project, one-hot encoding is used to transform the user input data into a format that can be used in the cosine similarity algorithm. Each input category (e.g., course, diet, cuisine, and ingredients) is assigned a unique integer value, and a binary vector is created for each input observation.

One-Hot Encoding Example

![One-Hot Encoding](https://github.com/ishanjain18/SavourEaseApp/blob/main/one_hot_encoding.png)

The above image shows an example of one-hot encoding applied to a dataset with three categories: colors - red, blue & green. Each category is assigned a unique integer value, and a binary vector is created for each observation in the dataset, with a value of 1 in the corresponding category column and 0s in all other columns.

## Project Structure

```
📦
├─ README.md
├─ backend
│  ├─ .dockerignore
│  ├─ .gitignore
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ datasets
│  │  ├─ IndianFoodDatasetCSV.csv
│  │  ├─ data.csv
│  │  └─ encoded.csv
│  ├─ main.py
│  ├─ requirements.txt
│  └─ scripts
│     └─ preprocessing.ipynb
├─ docker-compose.yaml
└─ frontend
   ├─ .dockerignore
   ├─ .gitignore
   ├─ Dockerfile
   ├─ README.md
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   └─ src
      ├─ App.js
      ├─ App.test.js
      ├─ components
      ├─ index.css
      ├─ index.js
      ├─ pages
      ├─ services
      ├─ static
      └─ utilities
```
