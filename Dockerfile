# Use an official Python image
FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first (for faster rebuilds)
COPY requirements.txt .

# Install system dependencies and Python packages
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app into the container
COPY . .

# Expose FastAPI default port
EXPOSE 8000

# Run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
