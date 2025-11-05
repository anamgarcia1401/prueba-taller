import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../api/productApi";
import type { AppDispatch } from "../store/store";

export default function ProductForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState({ nombre: "", descripcion: "", precio: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.nombre || !data.descripcion || !data.precio) {
      alert("Completa todos los campos");
      return;
    }
    await dispatch(
      createProduct({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: Number(data.precio),
      })
    );
    setData({ nombre: "", descripcion: "", precio: "" });
  };

  return (
    <div className="form-container">
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input name="nombre" value={data.nombre} onChange={handleChange} />

        <label>Descripción</label>
        <textarea name="descripcion" value={data.descripcion} onChange={handleChange} />

        <label>Precio</label>
        <input name="precio" type="number" value={data.precio} onChange={handleChange} />

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}
