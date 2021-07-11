import React from "react";
import EmployeeList from "./EmployeeList";
import ProductList from "./ProductList";

export default function Intro(): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl font-extralight text-red-500 my-4">
        Introduction
      </h1>

      <h2 className="text-lg text-red-400">Employees</h2>
      <EmployeeList />

      <h2 className="text-lg text-red-400 mt-5">Products</h2>
      <ProductList />
    </div>
  );
}
