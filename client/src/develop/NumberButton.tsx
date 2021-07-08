import React from "react";
import Icon from "@mdi/react";
import { mdiThumbUp } from "@mdi/js";
import { mdiThumbDown } from "@mdi/js";

interface ButtonSpec {
  image: "up" | "down";
  num: number;
}

export default function NumberButton({ image, num }: ButtonSpec): JSX.Element {
  return (
    <button className="bg-white rounded-xl w-12 h-14 focus:outline-none">
      <Icon
        path={image === "up" ? mdiThumbUp : mdiThumbDown}
        size={0.9}
        className="block mx-auto"
      />
      <p className="text-sm">{num <= 999 ? num : '999+'}</p>
    </button>
  );
}
