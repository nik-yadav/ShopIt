import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Sidebar from "./Sidebar";
import ProductCard from "../utilities/ProductCard";
import ProductDescription from "./ProductDescription";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    // fetch all of the products from database when the component first mounts
    fetch(`${API}/products?limit=all`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.log(err);
        setErrMessage(err.message);
      });
  }, []);

  // show error page, if something went wrong while fethcing the data from backend
  if (errMessage)
    return (
      <div className="text-center">
        {errMessage +
          ", sorry for the incovenience, seems like backend server is not alive"}
      </div>
    );

  // show loading... text while data is being fetched from the backend
  if (!products) return <div className="text-center">Loading...</div>;

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
