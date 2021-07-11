import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiCommentQuoteOutline } from "@mdi/js";

interface EmployeeInfo {
  id: string;
  image: string;
  name: string;
  position: string;
  speaking: string;
}

export default function EmployeeList(): JSX.Element {
  const [employees, setEmployees] = useState<EmployeeInfo[]>([]);

  useEffect(() => {
    fetch("/api/v1/employee").then(async (res: Response) => {
      const employees: EmployeeInfo[] = await res.json();
      setEmployees(employees);
    });
  }, []);

  return (
    <div>
      <div className="space-y-3 mt-3">
        {employees.map((employee) => (
          <Employee key={employee.id} {...employee} />
        ))}
      </div>
    </div>
  );
}

function Employee(info: EmployeeInfo): JSX.Element {
  return (
    <div className="p-8 max-w-2xl mx-auto bg-red-50 rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 dark:bg-green-900">
      <img
        className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
        src={info.image}
        alt="User Face"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold dark:text-white">
            {info.name}
          </p>
          <p className="text-gray-700 font-medium dark:text-gray-200">
            {info.position}
          </p>
          <p className="text-gray-500 font-light italic dark:text-gray-300">
            <Icon
              path={mdiCommentQuoteOutline}
              size={0.8}
              title="Double quote"
              className="inline-block mr-1"
            />
            {info.speaking}
          </p>
        </div>
        <button className="px-4 py-1 text-sm text-red-300 font-semibold rounded-full border border-red-300 hover:text-white hover:bg-red-400 hover:border-transparent focus:outline-none active:bg-red-500 transition dark:text-green-400 dark:border-green-400 dark:hover:bg-green-500 dark:hover:text-white dark:active:bg-green-400">
          Message
        </button>
      </div>
    </div>
  );
}
