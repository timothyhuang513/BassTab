from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
import sys
import subprocess
from audio_utils import split_audio, generate_tab_data

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, world! 🎸"}

@app.post("/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    with open("input.mp3", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    split_audio()
    tab_data = generate_tab_data()
    
    return JSONResponse(content=tab_data)