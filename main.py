from fastapi import FastAPI, File, UploadFile
import shutil
import os

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, world! 🎸"}

@app.post("/upload/")
async def upload_audio(file: UploadFile = File(...)):
    # Save uploaded file to disk
    with open("input.mp3", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": f"File '{file.filename}' uploaded successfully!"}
