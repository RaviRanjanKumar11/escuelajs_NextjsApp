"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        console.log("data", response.data);
       
        setProducts(response.data);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
       });
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  // Group products into rows (4 items per row)
  const productRows = [];
  for (let i = 0; i < products.length; i += 4) {
    productRows.push(products.slice(i, i + 4));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">EscuelaJS Products</h1>
      <div className="flex flex-col gap-6 px-6">
        {productRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap justify-center gap-4">
            {row.map((product) => (
              <div key={product.id} className="w-64 border p-4 rounded shadow-md">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-36 h-36 mx-auto"
                />
                <h2 className="font-semibold mt-2">{product.title}</h2>
                <p className="text-gray-600 mt-1">${product.price}</p>
                <p className="text-gray-600 mt-1">{product.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
