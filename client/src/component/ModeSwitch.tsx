import React, { Dispatch, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@mdi/react";
import { mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";
import { RootState } from "../store/rootReducer";
import { DarkModeAction } from "../store/darkModeReducer";

export default function ModeSwitch(): JSX.Element {
  const initialDark = useSelector((state: RootState) => state.darkMode);
  const [active, setActive] = useState(initialDark);
  const dispatchDarkMode = useDispatch<Dispatch<DarkModeAction>>();

  const onToggle = (e: FormEvent<HTMLInputElement>) => {
    const useDarkMode = e.currentTarget.checked;
    setActive(useDarkMode);
    localStorage.theme = useDarkMode ? "dark" : "light";
    dispatchDarkMode({ type: "darkModeAction", payload: useDarkMode });

    if (useDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="inline-block">
      <label className="cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            onChange={onToggle}
            defaultChecked={active}
          />
          <div
            className={
              "flex w-12 h-7 rounded-full shadow-inner transition-colors " +
              (active ? "bg-green-400" : "bg-red-400")
            }
          >
            <div className="flex justify-between w-full mx-1">
              <Icon
                className={
                  "text-white my-auto left-1 transition-opacity " +
                  (active ? "" : "opacity-0")
                }
                path={mdiWeatherNight}
                title="Night Icon"
                size={0.8}
              />
              <Icon
                className={
                  "text-white my-auto right-1 transition-opacity " +
                  (active ? "opacity-0" : "")
                }
                path={mdiWeatherSunny}
                title="Sunny Icon"
                size={0.9}
              />
            </div>
          </div>
          <div
            className={
              "absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transition " +
              (active ? "transform translate-x-full" : "")
            }
          ></div>
        </div>
      </label>
    </div>
  );
}
