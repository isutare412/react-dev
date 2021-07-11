import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";
import ModeSwitch from "./component/ModeSwitch";

interface NavState {
  href: string;
  name: string;
  activate: boolean;
}

const navInfos: NavState[] = [
  { href: "/", name: "Home", activate: false },
  { href: "/intro", name: "Intro", activate: false },
  { href: "/dev", name: "Dev", activate: false },
];

export default function NavBar(): JSX.Element {
  const [navState, setNavState] = useState(navInfos);
  const navLocation = useLocation();

  useEffect(() => {
    const routePath = navLocation.pathname;

    // Find longest matching route
    let matchLength = 0;
    let matchIdx = 0;
    navState.forEach(({ href }, idx) => {
      if (!routePath.startsWith(href) || matchLength > href.length) return;
      matchLength = href.length;
      matchIdx = idx;
    });

    // Update to new navbar state
    setNavState((prevState) => {
      const nextState = [...prevState];
      nextState.forEach((_, idx, arr) => (arr[idx].activate = false));
      nextState[matchIdx].activate = true;
      return nextState;
    });
  }, [navLocation]);

  return (
    <nav className="bg-white w-full border md:border-none md:shadow dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800">
      <div className="flex justify-between mx-auto md:max-w-screen-md">
        <div>
          <ul className="ml-2">
            {navState.map(({ href, name, activate }, idx) => (
              <NavItem key={idx} name={name} activate={activate} href={href} />
            ))}
          </ul>
        </div>
        <div className="flex flex-row content-center space-x-1 mr-2">
          <a
            href="https://github.com/isutare412"
            className="text-gray-400 hover:text-gray-600 transition-colors block my-auto dark:text-gray-400 dark:hover:text-gray-100"
          >
            <Icon
              className="my-auto"
              path={mdiGithub}
              title="Github"
              size={1.25}
            />
          </a>
          <div className="my-auto">
            <ModeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, name, activate }: NavState): JSX.Element {
  const history = useHistory();

  function gotoLink() {
    history.push(href);
  }

  return (
    <li className="inline-block">
      <button
        className={
          "my-1 ml-1 px-2 py-1 rounded-md focus:outline-none transition " +
          (activate ? "bg-red-400 text-white dark:bg-green-500 dark:text-black" : "hover:bg-red-200 dark:hover:bg-green-900")
        }
        onClick={gotoLink}
      >
        <span>{name}</span>
      </button>
    </li>
  );
}
