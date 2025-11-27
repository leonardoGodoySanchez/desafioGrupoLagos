from pydantic import BaseModel
from typing import Optional

class ProductIn(BaseModel):
    barcode: Optional[str]
    name: str
    category: Optional[str] = None
    price: Optional[float] = None

class ProductOut(ProductIn):
    id: int
    eco_score: Optional[float] = None
    social_score: Optional[float] = None
    global_score: Optional[float] = None

    class Config:
        orm_mode = True
