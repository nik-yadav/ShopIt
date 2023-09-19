import React from "react";
import { API } from "../backend";
import Base from "./Base";
import ProductCard from "../utilities/ProductCard";

const products = [
  {
    brand: "Lymio",
    name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
    rating: "4.95",
    reviews: "73",
    price: "349",
    mrp: "4,999",
    off: "93",
  },
];

export default function Home() {
  console.log("API IS", API);

  return (
    <Base>
      <div className="grid grid-cols-3 gap-y-3 gap-x-2">
        <ProductCard product={products[0]} />
        <ProductCard product={products[0]} />
        <ProductCard product={products[0]} />
      </div>
    </Base>
  );
}
