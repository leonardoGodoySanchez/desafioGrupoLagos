from app.services.scoring import global_score

def multi_objective_knapsack(products: list, budget: float):
    """
    products: lista de dicts con:
        - name
        - price
        - category
        - estimated_impact (opcional)
    """

    # Impacto base (ANTES)
    impact_before = sum([1 - global_score(p["price"], p.get("category"))["environmental"]
                         for p in products])

    # Pre-calcular puntuaciones
    enriched = []
    for p in products:
        sustain = global_score(p["price"], p.get("category"))

        # impacto ambiental inverso
        impact = 1 - sustain["environmental"]

        # fórmula multiobjetivo
        fitness = (
            0.5 * sustain["global"] +
            0.3 * (1 / max(p["price"], 1)) +
            0.2 * (1 / max(impact, 0.01))
        )

        enriched.append({
            "raw": p,
            "sustain": sustain,
            "impact": impact,
            "fitness": fitness
        })

    # Ordenamiento por fitness
    enriched.sort(key=lambda x: x["fitness"], reverse=True)

    chosen = []
    total_cost = 0
    impact_after = 0

    for item in enriched:
        price = item["raw"]["price"]
        if total_cost + price <= budget:
            chosen.append(item)
            total_cost += price
            impact_after += item["impact"]

    # calcular ahorro
    cost_before = sum(p["price"] for p in products)
    savings = cost_before - total_cost

    return {
        "selected_products": [
            item["raw"] | {"sustainability": item["sustain"]} for item in chosen
        ],
        "total_cost": round(total_cost, 2),
        "savings": round(savings, 2),
        "impact_before": round(impact_before, 3),
        "impact_after": round(impact_after, 3)
    }
