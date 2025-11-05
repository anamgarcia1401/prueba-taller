import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Product } from "../types";


const SUPABASE_URL = "https://qkclmecrwnaqmrplcroq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrY2xtZWNyd25hcW1ycGxjcm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTQ1OTIsImV4cCI6MjA3NzE3MDU5Mn0.gaKXvANpaTD3PQpin2kJqn3g_itawi5N5XMtojXwkYM";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    Prefer: "return=representation",
  },
});

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await axiosInstance.get("products?select=*&order=id.desc");
  return res.data;
});

export const createProduct = createAsyncThunk("products/createProduct", async (newProduct: Omit<Product, "id" | "created_at">) => {
  const res = await axiosInstance.post("products", newProduct);
  return res.data[0];
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (product: Product) => {
  const res = await axiosInstance.put(`products?id=eq.${product.id}`, product);
  return res.data[0];
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: string) => {
  await axiosInstance.delete(`products?id=eq.${id}`);
  return id;
});
