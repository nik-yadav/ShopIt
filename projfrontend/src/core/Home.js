import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Sidebar from "./Sidebar";
import ProductCard from "../utilities/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([{}]);
  console.log("API IS", API);

  useEffect(() => {
    fetch(`${API}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Sidebar>
      <div className="grid grid-cols-3 gap-y-3 gap-x-2">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Sidebar>
  );
}
