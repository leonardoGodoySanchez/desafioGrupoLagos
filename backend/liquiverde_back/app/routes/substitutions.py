from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import os, json
from app.services.substitutions import find_substitutes

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "products_sample.json")

class ProductIn(BaseModel):
    name: str
    price: float
    category: str | None = None

@router.post("/")
def get_substitutes(body: ProductIn):
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        products = json.load(f)

    # Llamar a lógica de subtitutions
    result = find_substitutes(body.dict(), products)

    return {"substitutes": result}
