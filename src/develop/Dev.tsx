import React from "react";
import EmployeeList from "./EmployeeList";

export default function Dev(): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl font-extralight text-red-500 my-4">Developing</h1>
      <h2 className="text-lg text-red-400">Employees</h2>
      <EmployeeList />
    </div>
  );
}
