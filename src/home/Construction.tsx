import React from "react";

export default function Contruction(): JSX.Element {
  return (
    <div className="mx-auto text-center w-max">
      <span className="text-sm">
        The site is on construction. Go to&nbsp;
        <a
          className="text-yellow-600 hover:text-yellow-400 transition-colors"
          href="https://github.com/isutare412"
        >
          Github
        </a>
      </span>
    </div>
  );
}
