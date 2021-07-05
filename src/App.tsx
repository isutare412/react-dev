import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dev from "./develop/Dev";
import Home from "./home/Home";
import NavBar from "./NavBar";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="font-sans bg-white w-full p-3 mx-auto md:mt-2 md:shadow-lg md:rounded-lg md:max-w-screen-md">
        <Switch>
          <Route path="/dev">
            <Dev />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
