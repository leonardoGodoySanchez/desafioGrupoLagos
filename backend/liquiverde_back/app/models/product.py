from sqlmodel import SQLModel, Field
from typing import Optional

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    barcode: Optional[str] = Field(index=True, default=None)
    name: str
    category: Optional[str] = None
    price: Optional[float] = None
    weight_g: Optional[int] = None
    calories_per_100g: Optional[float] = None
    nutri_score: Optional[str] = None
    eco_score: Optional[float] = None
    social_score: Optional[float] = None
    global_score: Optional[float] = None
