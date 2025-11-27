from fastapi import FastAPI
from app.routes import products, optimize, substitutions
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LiquiVerde API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # durante el test, abierto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(optimize.router, prefix="/optimize", tags=["Optimizer"])
app.include_router(substitutions.router, prefix="/substitutions", tags=["Substitutions"])

@app.get("/products/{barcode}")
# def get_product(barcode: str):
#     product = next((p for p in products if p["barcode"] == barcode), None)
    
#     if product is None:
#         return {"error": "Producto no encontrado"}
    
#     return product

def root():
    return {"message": "LiquiVerde backend ok"}
