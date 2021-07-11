import React from "react";
import EmployeeList from "./EmployeeList";
import ProductList from "./ProductList";

export default function Intro(): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl font-extralight text-red-500 my-4 dark:text-green-500">
        Introduction
      </h1>

      <h2 className="text-lg text-red-500 dark:text-green-500">Employees</h2>
      <EmployeeList />

      <h2 className="text-lg text-red-500 mt-5 dark:text-green-500">
        Products
      </h2>
      <ProductList />
    </div>
  );
}
