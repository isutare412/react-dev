import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import Hamburger from "hamburger-react";
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";
import BrandLogo from "./BrandLogo";
import DarkModeSwitch from "./DarkModeSwitch";

interface NavState {
  href: string;
  name: string;
  useUi: boolean;
  activate: boolean;
}

interface NavItemProps {
  name: string;
  activate: boolean;
  onClick: () => void;
}

const navInfos: NavState[] = [
  { href: "/", name: "Home", useUi: false, activate: false },
  { href: "/intro", name: "Intro", useUi: true, activate: false },
  { href: "/dev", name: "Dev", useUi: true, activate: false },
];

function findBestRoute(href: string, navs: NavState[]): string | null {
  // Find longest matching route
  let matchLength = 0;
  let matchIdx: number | null = null;
  navs.forEach((nav, idx) => {
    if (!href.startsWith(nav.href) || matchLength > nav.href.length) return;
    matchLength = nav.href.length;
    matchIdx = idx;
  });

  // Match not found
  if (matchIdx === null) return null;

  return navs[matchIdx].href;
}

export default function NavBar(): JSX.Element {
  const [navState, setNavState] = useState(navInfos);
  const [navOpen, setNavOpen] = useState(false);
  const navLocation = useLocation();
  const history = useHistory();

  useEffect(() => {
    setNavOpen(false);

    const routePath = navLocation.pathname;

    // Find longest matching route
    const targetLink = findBestRoute(routePath, navInfos);

    // Update to new navbar state
    setNavState((prevState) => {
      const nextState = [...prevState];
      nextState.forEach((_, idx, arr) => {
        arr[idx].activate = arr[idx].href === targetLink ? true : false;
      });
      return nextState;
    });
  }, [navLocation]);

  const gotoLink = (href: string) => {
    const targetLink = findBestRoute(href, navInfos);
    if (targetLink === null) return;

    const targetNav = navState.find(({ href }) => href === targetLink);
    if (targetNav === undefined)
      throw new Error(`href '${href}' does not exist in navigations`);

    if (!targetNav.activate) {
      history.push(targetNav.href);
    }
  };

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
            <div className="hidden sm:flex flex-col justify-center">
              <BrandLogo onClick={() => gotoLink("/")} />
            </div>
            <div className={"content-center space-x-2 hidden sm:flex"}>
              {navState
                .filter((nav) => nav.useUi)
                .map((nav, idx) => (
                  <NavItem
                    key={idx}
                    {...nav}
                    onClick={() => gotoLink(nav.href)}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col justify-center sm:hidden">
            <BrandLogo onClick={() => gotoLink("/")} />
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
                <MobileNavItem
                  key={idx}
                  {...state}
                  onClick={() => gotoLink(state.href)}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>
    </ClickAwayListener>
  );
}

function NavItem({ name, activate, onClick }: NavItemProps): JSX.Element {
  return (
    <button
      className={
        "px-2 py-1 my-auto rounded-md focus:outline-none transition " +
        (activate
          ? "bg-red-400 text-white dark:bg-green-500 dark:text-black"
          : "hover:bg-red-200 dark:hover:bg-green-900")
      }
      onClick={onClick}
    >
      <span className="text-lg">{name}</span>
    </button>
  );
}

function MobileNavItem({ name, activate, onClick }: NavItemProps): JSX.Element {
  return (
    <button
      className={
        "block py-1 mx-2 rounded-md " +
        (activate
          ? "text-white bg-red-400 dark:bg-gray-700"
          : "hover:bg-red-200 dark:hover:bg-gray-800")
      }
      onClick={onClick}
    >
      <p className="text-lg text-left ml-3">{name}</p>
    </button>
  );
}
