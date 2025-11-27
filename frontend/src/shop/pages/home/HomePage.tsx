import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.getProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);

    const results = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase()) ||
      p.category.toLowerCase().includes(value.toLowerCase()) ||
      p.barcode.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(results);
  };

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">

      {/* Botón Optimizar */}
      <div className="mb-6">
        <Button asChild>
          <Link to="/optimize">→ Optimizar lista de compras</Link>
        </Button>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-semibold mb-4">Productos disponibles</h2>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar por nombre, categoría o barcode..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <Link
            key={p.barcode}
            to={`/product/${p.barcode}`}
            className="block border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition cursor-pointer"
          >
            <h3 className="text-lg font-medium">{p.name}</h3>

            <p className="text-slate-700">
              <strong>Categoría: </strong>
              <span className="font-semibold text-slate-600">{p.category}</span>
            </p>

            <p className="text-slate-700">
              <strong>Precio: </strong>
              <span className="font-semibold text-green-700">${p.price}</span>
            </p>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 col-span-2">
            No se encontraron productos para “{query}”
          </p>
        )}
      </div>
    </div>
  );
};
