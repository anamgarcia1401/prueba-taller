import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchProducts, deleteProduct } from "../api/productApi"; // 👈 agrega fetchProducts

export default function ProductList() {
  const { list } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  // 🔹 esto carga los productos cuando se abre la página
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="table-container">
      <h2>Lista de productos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={4}>No hay productos todavía</td>
            </tr>
          ) : (
            list.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>${p.precio}</td>
                <td>
                  <button onClick={() => dispatch(deleteProduct(p.id))}>🗑 Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
