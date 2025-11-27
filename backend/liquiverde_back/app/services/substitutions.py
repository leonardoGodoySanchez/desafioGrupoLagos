from app.services.scoring import global_score

def find_substitutes(target_product: dict, all_products: list):
    """
    target_product: dict con: name, price, category
    all_products: lista completa del JSON
    """

    category = (target_product.get("category") or "").lower()

    # Obtener categoría del target
    same_category = [
        p for p in all_products
        if (p.get("category") or "").lower() == category and p["name"] != target_product["name"]
    ]

    # Si no hay en la misma categoría, usar dataset
    candidates = same_category if same_category else all_products

    enriched = []
    for p in candidates:
        sust = global_score(p["price"], p.get("category"))
        impact = 1 - sust["environmental"]
        score = sust["global"]

        # ranking combinado según evaluación
        fitness = (
            0.5 * score +       # priorizar sostenibilidad
            0.3 * (1 / max(p["price"], 1)) +
            0.2 * (1 / max(impact, 0.01))
        )

        enriched.append({
            "product": p,
            "sustainability": sust,
            "impact": impact,
            "fitness": fitness
        })

    # Ordenar mejores sustitutos primero
    enriched.sort(key=lambda x: x["fitness"], reverse=True)

    # Devolver top 5 sustitutos
    return [
        item["product"] | {"sustainability": item["sustainability"]}
        for item in enriched[:5]
    ]
