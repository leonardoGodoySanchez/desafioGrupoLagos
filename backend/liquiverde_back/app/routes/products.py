from fastapi import APIRouter
from app.services.scoring import global_score
import json
import os

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "products_sample.json")
DATA_PATH = os.path.normpath(DATA_PATH)

def load_products():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        products = json.load(f)

    fixed = []
    for idx, p in enumerate(products):
        new_p = {
            "id": idx + 1,
            "barcode": p.get("barcode"),
            "name": p.get("name"),
            "category": p.get("category"),
            "price": p.get("price"),
            "eco_score": p.get("eco_score"),
            "social_score": p.get("social_score"),
        }

        score = global_score(p["price"], p.get("category"))

        new_p["sustainability"] = {
            "global": score,
            "eco": p.get("eco_score"),
            "social": p.get("social_score"),
        }

        fixed.append(new_p)

    return fixed


@router.get("/")
def get_all_products():
    return load_products()


@router.get("/{barcode}")
def get_product(barcode: str):
    data = load_products()
    product = next((p for p in data if p["barcode"] == barcode), None)

    if not product:
        return {"error": "Producto no encontrado"}

    return product


@router.get("/{barcode}/substitutes")
def get_substitutes(barcode: str):
    data = load_products()

    base = next((p for p in data if p["barcode"] == barcode), None)
    if not base:
        return {"error": "Producto no encontrado"}

    category = base["category"]

    substitutes = [
        p for p in data
        if p["category"] == category and p["barcode"] != barcode
    ]

    substitutes = sorted(
        substitutes,
        key=lambda x: x["sustainability"]["global"]["global"],
        reverse=True
    )

    return substitutes[:3]
