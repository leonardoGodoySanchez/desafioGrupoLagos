from sqlmodel import SQLModel, create_engine, Session, text
from pathlib import Path
import json
from .config import DATABASE_URL

engine = create_engine(DATABASE_URL, echo=False)

def init_db():
    SQLModel.metadata.create_all(engine)
    # seed DB from data/products_sample.json if table empty
    try:
        with Session(engine) as session:
            res = session.exec(text("SELECT count(1) FROM product")).one_or_none()
            count = res[0] if res else 0
            if count == 0:
                p = Path(__file__).parent.parent / "data" / "products_sample.json"
                if p.exists():
                    items = json.loads(p.read_text(encoding="utf-8"))
                    from .models.product import Product
                    for it in items:
                        prod = Product(
                            barcode=it.get('barcode'),
                            name=it.get('name'),
                            category=it.get('category'),
                            price=it.get('price'),
                            eco_score=it.get('eco_score', 0.5),
                            social_score=it.get('social_score', 0.5)
                        )
                        session.add(prod)
                    session.commit()
    except Exception as e:
        print("DB seed error:", e)
