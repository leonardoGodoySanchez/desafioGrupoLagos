import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const ProductPage = () => {
  const { barcode } = useParams();  // ⬅ USAR barcode, no id
  const [product, setProduct] = useState<any>(null);
  const [subs, setSubs] = useState<any[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [subsRequested, setSubsRequested] = useState(false);


  useEffect(() => {
    if (!barcode) return;

    api.getProduct(barcode).then((res) => {
      setProduct(res);
      console.log("PRODUCTO COMPLETO =>", res);

    });
  }, [barcode]);

  const loadSubstitutes = () => {
    if (!product) return;

    setSubsRequested(true);  
    setLoadingSubs(true);

    api.getSubstitutes(product.barcode)
      .then((res) => {
        setSubs(res || []);
      })
      .finally(() => setLoadingSubs(false));
  };

  if (!product) {
    return <div style={{ padding: 20 }}>Cargando...</div>;
  }

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      
      {/* Botón volver */}
      <Button asChild>
        <Link to="/">← Volver</Link>
      </Button>

      {/* Tarjeta principal */}
      <div className="border rounded-lg shadow-sm p-4 bg-white mt-6">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

        <p className="text-slate-700 mt-1">
          <strong>Categoría: </strong>
          <span className="font-semibold text-slate-600">{product.category}</span>
        </p>

        <p className="text-slate-700 mt-1">
          <strong>Precio: </strong>
          <span className="font-semibold text-green-700">${product.price}</span>
        </p>
      </div>

      {/* Sostenibilidad */}
      <h3 className="mt-6 font-semibold text-lg">Sostenibilidad</h3>

      <div className="bg-slate-100 rounded-lg p-4 inline-block mt-2">

        {/* ECO */}
        <p><strong>Económico:</strong> {product.sustainability.eco}</p>

        {/* SOCIAL */}
        <p><strong>Social:</strong> {product.sustainability.social}</p>

        {/* GLOBAL (ahora desglosado) */}
        <p><strong>Puntaje Global:</strong> {product.sustainability.global.global}</p>
        <p><strong>Ambiental:</strong> {product.sustainability.global.environmental}</p>
        <p><strong>Económico (global):</strong> {product.sustainability.global.economic}</p>
        <p><strong>Social (global):</strong> {product.sustainability.global.social}</p>
      </div>

      {/* Botón sustitutos */}
      <div className="mt-6">
        <button
          onClick={loadSubstitutes}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loadingSubs ? "Cargando..." : "Ver sustitutos"}
        </button>
      </div>

      {/* Lista de sustitutos */}
      <div className="mt-6">

        {/* Antes de apretar el botón → no mostrar nada */}
        {!subsRequested && null}

        {/* Apretó → está cargando */}
        {subsRequested && loadingSubs && (
          <p>Cargando sustitutos...</p>
        )}

        {/* Apretó → no hay sustitutos */}
        {subsRequested && !loadingSubs && subs.length === 0 && (
          <p>No se encontraron sustitutos por el momento.</p>
        )}

        {/* Apretó → sí hay sustitutos */}
        {subsRequested && !loadingSubs && subs.length > 0 && (
          <>
            <h3 className="font-semibold mb-2">Alternativas más sostenibles</h3>
            <ul className="list-disc ml-6">
              {subs.map((s, idx) => (
                <li key={idx}>
                  {s.name} — <strong>${s.price}</strong>
                </li>
              ))}
            </ul>
          </>
        )}

      </div>
    </div>
  );
};
