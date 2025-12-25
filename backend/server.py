from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Chiku Birthday App API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Happy Birthday Chirag! 🎂"}

@app.get("/api/birthday-config")
async def get_birthday_config():
    return {
        "name": "Chirag",
        "level": 16,
        "audioSrc": "https://customer-assets.emergentagent.com/job_birthday-surprise-205/artifacts/jg47gc1p_happy-birthday-song.mp3",
        "theme": "hacker"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
