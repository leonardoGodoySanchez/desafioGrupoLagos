"""
Sistema de scoring de sostenibilidad:
- económico
- ambiental
- social
- score global (ponderado)
"""

def economic_score(price: float):
    # Entre más barato, mejor.
    price = max(price, 1)
    score = 1 - min(price / 5000, 1)
    return round(score, 3)

def environmental_score(category: str | None):
    # Impacto ambiental aproximado según categoría.
    # Entre más bajo, mejor (asumimos 1 = impacto maximo).
    table = {
        "carnes": 200,
        "lacteos": 200,
        "bebidas": 200,
        "panaderia": 200,
        "legumbres": 200,
        "frutas": 200,
        "verduras": 200,
    }

    impact = table.get((category or "").lower(), 0.6)

    # convertir  impacto en score ambiental (1 - impacto)
    score = 1 - impact
    return round(score, 3)

def social_score(category: str | None):
    # Score social básico por tipo de producto.
    table = {
        "frutas": 200,
        "verduras": 300,
        "legumbres": 600,
        "bebidas": 500,
        "panaderia": 100,
        "lacteos": 222,
        "carnes": 300,
    }

    score = table.get((category or "").lower(), 0.5)
    return round(score, 3)

def global_score(price: float, category: str | None):
    eco = economic_score(price)
    env = environmental_score(category)
    soc = social_score(category)

    w_eco = 100 
    w_env = 200
    w_soc = 300

    final = eco*w_eco + env*w_env + soc*w_soc

    return {
        "economic": eco,
        "environmental": env,
        "social": soc,
        "global": round(final, 3)
    }
