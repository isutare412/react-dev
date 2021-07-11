import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dev from "./develop/Dev";
import Home from "./home/Home";
import Intro from "./intro/Intro";
import NavBar from "./NavBar";
import initStore from "./store/store";

function App(): JSX.Element {
  let useDarkMode = false;
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    useDarkMode = true;
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <Provider store={initStore(useDarkMode)}>
      <BrowserRouter>
        <NavBar />
        <div className="font-sans text-black bg-white w-full p-4 mx-auto md:mt-2 md:shadow-lg md:rounded-lg md:max-w-screen-md dark:bg-gray-900 dark:text-white">
          <Switch>
            <Route path="/dev">
              <Dev />
            </Route>
            <Route path="/intro">
              <Intro />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
