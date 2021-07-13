import React from "react";

export default function Home(): JSX.Element {
  return (
    <div>
      <h1 className="text-center text-5xl font-extralight text-red-500 my-5 dark:text-green-400">
        DevGround
      </h1>

      <div className="mx-auto text-center w-max">
        <span className="text-sm">
          The site is under construction. Go to&nbsp;
          <a
            className="text-red-400 hover:text-red-600 transition-colors dark:text-green-300 dark:hover:text-green-500"
            href="https://github.com/isutare412"
          >
            Github
          </a>
        </span>
      </div>
    </div>
  );
}
