import React from "react";
import { API } from "../backend";
import Base from "./Base";
import Sidebar from "./Sidebar";
import ProductCard from "../utilities/ProductCard";

const products = [
  {
    id: 1,
    brand: "Lymio",
    name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
    rating: "4.95",
    reviews: "73",
    price: "349",
    mrp: "4,999",
    off: "93",
  },
  {
    id: 2,
    brand: "Lymio",
    name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
    rating: "4.95",
    reviews: "73",
    price: "349",
    mrp: "4,999",
    off: "93",
  },
  {
    id: 3,
    brand: "Lymio",
    name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
    rating: "4.95",
    reviews: "73",
    price: "349",
    mrp: "4,999",
    off: "93",
  },
  {
    id: 4,
    brand: "Lymio",
    name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
    rating: "4.95",
    reviews: "73",
    price: "349",
    mrp: "4,999",
    off: "93",
  },
  {
    id: 5,
    brand: "Lymio",
    name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
    rating: "4.95",
    reviews: "73",
    price: "349",
    mrp: "4,999",
    off: "93",
  },
  {
    id: 6,
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
      <Sidebar>
        <div className="grid grid-cols-3 gap-y-3 gap-x-2">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </Sidebar>
    </Base>
  );
}
