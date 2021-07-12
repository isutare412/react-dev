import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import Hamburger from "hamburger-react";
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";
import DarkModeSwitch from "./DarkModeSwitch";

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
  const [navOpen, setNavOpen] = useState(false);
  const navLocation = useLocation();

  useEffect(() => {
    setNavOpen(false);

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

  const closeNavBar = () => {
    if (navOpen) {
      setNavOpen(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={closeNavBar}>
      <nav className="bg-white w-full border-b md:border-none md:shadow dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800">
        <div className="flex justify-between h-12 mx-auto md:max-w-screen-md">
          <div className="flex flex-row content-center space-x-2 ml-1">
            <div className="sm:hidden">
              <Hamburger toggled={navOpen} toggle={setNavOpen} size={24} />
            </div>
            <div className={"content-center space-x-1 hidden sm:flex"}>
              {navState.map(({ href, name, activate }, idx) => (
                <NavItem
                  key={idx}
                  name={name}
                  activate={activate}
                  href={href}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row content-center space-x-2 mr-2 h-full">
            <a
              href="https://github.com/isutare412"
              className="text-gray-400 hover:text-gray-600 transition-colors block my-auto dark:text-gray-400 dark:hover:text-gray-100"
            >
              <Icon
                className="my-auto"
                path={mdiGithub}
                title="Github"
                size={1.4}
              />
            </a>
            <div className="my-auto">
              <DarkModeSwitch />
            </div>
          </div>
        </div>
        <div
          className={"w-full absolute sm:hidden " + (navOpen ? "" : "hidden")}
        >
          <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-xl">
            <div className="flex flex-col space-y-1 my-2">
              {navState.map((state, idx) => (
                <MobileNavItem key={idx} {...state} />
              ))}
            </div>
          </div>
        </div>
      </nav>
    </ClickAwayListener>
  );
}

function NavItem({ href, name, activate }: NavState): JSX.Element {
  const history = useHistory();

  function gotoLink() {
    if (activate) {
      history.replace(href);
    } else {
      history.push(href);
    }
  }

  return (
    <button
      className={
        "px-2 py-1 my-auto rounded-md focus:outline-none transition " +
        (activate
          ? "bg-red-400 text-white dark:bg-green-500 dark:text-black"
          : "hover:bg-red-200 dark:hover:bg-green-900")
      }
      onClick={gotoLink}
    >
      <span className="text-lg">{name}</span>
    </button>
  );
}

function MobileNavItem({ href, name, activate }: NavState): JSX.Element {
  const history = useHistory();

  function gotoLink() {
    if (activate) {
      history.replace(href);
    } else {
      history.push(href);
    }
  }

  return (
    <button
      className={
        "block py-1 mx-2 rounded-md " +
        (activate
          ? "text-white bg-red-400 dark:bg-gray-700"
          : "hover:bg-red-200 dark:hover:bg-gray-800")
      }
      onClick={gotoLink}
    >
      <p className="text-lg text-left ml-3">{name}</p>
    </button>
  );
}
