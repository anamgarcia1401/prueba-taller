import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div className="container">
      <h1>Gestión de Productos</h1>
      <ProductForm />
      <hr />
      <ProductList />
    </div>
  );
}
