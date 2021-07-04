import React from "react";
import Contruction from "./Construction";

function App(): JSX.Element {
  return (
    <div className="font-sans w-full p-3 mt-3 mx-auto md:shadow-lg md:rounded-lg md:max-w-screen-md">
      <h1 className="text-center text-6xl font-extralight text-red-400 my-6">
        DevGround
      </h1>

      <Contruction />
    </div>
  );
}

export default App;
