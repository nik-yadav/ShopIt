import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Sidebar from "./Sidebar";
import ProductCard from "../utilities/ProductCard";

// const products = [
//   {
//     id: 1,
//     brand: "Lymio",
//     name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
//     rating: "4.95",
//     reviews: "73",
//     price: "349",
//     mrp: "4,999",
//     off: "93",
//   },
//   {
//     id: 2,
//     brand: "Lymio",
//     name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
//     rating: "4.95",
//     reviews: "73",
//     price: "349",
//     mrp: "4,999",
//     off: "93",
//   },
//   {
//     id: 3,
//     brand: "Lymio",
//     name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
//     rating: "4.95",
//     reviews: "73",
//     price: "349",
//     mrp: "4,999",
//     off: "93",
//   },
//   {
//     id: 4,
//     brand: "Lymio",
//     name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
//     rating: "4.95",
//     reviews: "73",
//     price: "349",
//     mrp: "4,999",
//     off: "93",
//   },
//   {
//     id: 5,
//     brand: "Lymio",
//     name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
//     rating: "4.95",
//     reviews: "73",
//     price: "349",
//     mrp: "4,999",
//     off: "93",
//   },
//   {
//     id: 6,
//     brand: "Lymio",
//     name: "Men T-Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (Rib)",
//     rating: "4.95",
//     reviews: "73",
//     price: "349",
//     mrp: "4,999",
//     off: "93",
//   },
// ];

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
