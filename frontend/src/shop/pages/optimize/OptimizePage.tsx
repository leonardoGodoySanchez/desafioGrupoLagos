import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const OptimizePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [budget, setBudget] = useState<number>(3000);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const optimize = async () => {
    const chosen = products
      .filter((p) => selected.includes(p.id))
      .map((p) => ({
        name: p.name,
        price: p.price,
        estimated_impact: p.sustainability.global,
      }));

    const res = await api.optimizeList({
      products: chosen,
      budget: budget,
    });

    setResult(res);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Button asChild>
        <Link to="/">
          ← Volver
        </Link>
      </Button>

      <h2 className="text-2xl font-bold mb-4">Optimizar compra</h2>

      {/* Presupuesto */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Presupuesto disponible</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="border rounded px-3 py-2 w-40"
        />
      </div>

      {/* Lista de productos */}
      <h3 className="text-lg font-semibold mb-2">Selecciona productos</h3>

      <div className="space-y-2 mb-6">
        {products.map((p) => (
          <label key={p.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() => toggleSelect(p.id)}
            />
            <span>
              {p.name} — <strong>${p.price}</strong>
            </span>
          </label>
        ))}
      </div>

      {/* Botón */}
      <button
        onClick={optimize}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        Optimizar
      </button>

      {/* Resultado */}
      {result && (
        <div className="mt-8 p-4 border rounded bg-slate-50">
          <h3 className="text-xl font-semibold mb-4">Resultado</h3>

          <p className="mb-2">
            <strong>Costo total:</strong> ${result.total_cost}
          </p>

          <p className="mb-2">
            <strong>Ahorro:</strong> ${result.savings ?? 0}
          </p>

          <p className="mb-2">
            <strong>Índice impacto ambiental antes: </strong> {result.impact_before ?? "N/A"}
          </p>

          <p className="mb-2">
            <strong>Índice impacto ambiental después: </strong> {result.impact_after ?? "N/A"}
          </p>

          <h4 className="mt-4 font-semibold">Productos elegidos:</h4>

          <ul className="list-disc ml-6 mt-1">
            {(result.selected_products ?? []).map((c: any, i: number) => (
              <li key={i}>
                {c.name} — <strong>${c.price}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
