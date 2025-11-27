from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.optimizer import multi_objective_knapsack

router = APIRouter()

class ProductIn(BaseModel):
    name: str
    price: float
    category: str | None = None

class OptimizeIn(BaseModel):
    budget: float
    products: List[ProductIn]

@router.post("/")
def optimize_list(body: OptimizeIn):
    product_dicts = [p.dict() for p in body.products]

    result = multi_objective_knapsack(
        products=product_dicts,
        budget=body.budget
    )

    return result
