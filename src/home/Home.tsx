import React from "react";
import Contruction from "./Construction";

export default function Home(): JSX.Element {
  return (
    <div>
      <h1 className="text-center text-5xl font-extralight text-red-500 my-5">
        DevGround
      </h1>

      <Contruction />
    </div>
  );
}
