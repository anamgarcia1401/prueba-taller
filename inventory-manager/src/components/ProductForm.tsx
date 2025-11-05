import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../api/productApi";
import type { AppDispatch } from "../store/store";

export default function ProductForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return alert("Completa todos los campos");

    try {
      await dispatch(
        createProduct({
          name,
          description,
          price: parseFloat(price),
        })
      ).unwrap(); // 💜 fuerza a esperar respuesta
      alert("Producto agregado correctamente");
      setName("");
      setDescription("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("Error al agregar producto");
    }
  };

  return (
    <div>
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
        />

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}
