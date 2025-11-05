import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../types"; // ✅ ESTA LÍNEA ARREGLA EL ERROR

let productos: Product[] = [
  { id: "1", nombre: "Camiseta", descripcion: "De algodón", precio: 45000 },
  { id: "2", nombre: "Pantalón", descripcion: "De jean", precio: 80000 },
];

// Leer todos
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  await new Promise((r) => setTimeout(r, 200));
  return productos;
});

// Crear
export const createProduct = createAsyncThunk(
  "products/create",
  async (nuevo: { nombre: string; descripcion: string; precio: number }) => {
    await new Promise((r) => setTimeout(r, 200));
    const nuevoProd = { ...nuevo, id: String(Date.now()) };
    productos.push(nuevoProd);
    return nuevoProd;
  }
);

// Eliminar
export const deleteProduct = createAsyncThunk("products/delete", async (id: string) => {
  await new Promise((r) => setTimeout(r, 200));
  productos = productos.filter((p) => p.id !== id);
  return id;
});

// Actualizar
export const updateProduct = createAsyncThunk(
  "products/update",
  async (prod: { id: string; nombre: string; descripcion: string; precio: number }) => {
    await new Promise((r) => setTimeout(r, 200));
    const i = productos.findIndex((p) => p.id === prod.id);
    if (i !== -1) productos[i] = prod;
    return prod;
  }
);
