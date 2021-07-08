import React from "react";
import ProductList from "./ProductList";

export default function Dev(): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl font-extralight text-red-500 my-4">Developing</h1>
      <h2 className="text-lg text-red-400">Products</h2>
      <ProductList />
    </div>
  );
}
