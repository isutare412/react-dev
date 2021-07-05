import React from "react";
import EmployeeList from "./EmployeeList";

export default function Dev(): JSX.Element {
  return (
    <div>
      <h1 className="text-3xl font-extralight text-red-400 my-4">Developing</h1>
      <EmployeeList />
    </div>
  );
}
