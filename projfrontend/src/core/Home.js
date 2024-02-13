import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Sidebar from "./Sidebar";
import ProductCard from "../utilities/ProductCard";
import ProductDescription from "./ProductDescription";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // console.log("API IS", API);

  useEffect(() => {
    fetch(`${API}/products?limit=all`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  if (!products) return "Loading...";

  return (
    <>
      {!selectedProduct && (
        <Sidebar
          onCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        >
          <div className="grid grid-cols-3 gap-y-3 gap-x-2">
            {products.map((product) => {
              // console.log("product on home = ", product);
              if (
                selectedCategory !== "All" &&
                product.category.name !== selectedCategory
              )
                return;
              return (
                <ProductCard
                  key={Math.random()}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              );
            })}
          </div>
        </Sidebar>
      )}
      {selectedProduct && <ProductDescription product={selectedProduct} />}
    </>
  );
}
