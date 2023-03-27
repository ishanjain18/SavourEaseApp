# Use the official Python image as the base image
FROM python:3.8.8

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose port 8000 for the application to listen on
EXPOSE 8000

# Set the default command to run the application
CMD ["uvicorn", "main:app", "--reload","--host", "localhost", "--port", "8000"]
