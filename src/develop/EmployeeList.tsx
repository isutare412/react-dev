import React from "react";
import Icon from "@mdi/react";
import { mdiCommentQuoteOutline } from "@mdi/js";

interface EmployeeInfo {
  id: string;
  img: string;
  name: string;
  position: string;
  speaking: string;
}

const employees: EmployeeInfo[] = [
  {
    id: "1",
    img: "https://avatars.githubusercontent.com/u/17609064?v=4",
    name: "Suhyuk Lee",
    position: "MLOps Engineer",
    speaking: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    img: "https://source.unsplash.com/jzY0KRJopEI/460x460",
    name: "Anonymous Unsplasher",
    position: "Genius Engineer",
    speaking:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
  },
];

export default function EmployeeList(): JSX.Element {
  return (
    <div>
      <div className="space-y-3 mt-3">
        {employees.map((employeeInfo) => (
          <Employee key={employeeInfo.id} {...employeeInfo} />
        ))}
      </div>
    </div>
  );
}

function Employee(info: EmployeeInfo): JSX.Element {
  return (
    <div className="p-8 max-w-2xl mx-auto bg-red-50 rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
        src={info.img}
        alt="User Face"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{info.name}</p>
          <p className="text-gray-700 font-medium">{info.position}</p>
          <p className="text-gray-500 font-light italic">
            <Icon
              path={mdiCommentQuoteOutline}
              size={0.8}
              title="Double quote"
              className="inline-block mr-1"
            />
            {info.speaking}
          </p>
        </div>
        <button className="px-4 py-1 text-sm text-red-300 font-semibold rounded-full border border-red-300 hover:text-white hover:bg-red-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition">
          Message
        </button>
      </div>
    </div>
  );
}
