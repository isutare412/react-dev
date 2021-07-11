import React from "react";
import Icon from "@mdi/react";
import { mdiThumbUp } from "@mdi/js";
import { mdiThumbDown } from "@mdi/js";

interface ButtonProps {
  image: "up" | "down";
  num: number;
  onLike: (like: boolean) => void;
}

export default function NumberButton({
  image,
  num,
  onLike,
}: ButtonProps): JSX.Element {
  return (
    <button
      className="bg-white rounded-xl w-12 h-14 focus:outline-none hover:bg-red-300 hover:text-white active:bg-red-400 transition-colors"
      onClick={() => onLike(image === "up")}
    >
      <Icon
        path={image === "up" ? mdiThumbUp : mdiThumbDown}
        size={0.9}
        className="block mx-auto"
      />
      <p className="text-sm">{num <= 999 ? num : "999+"}</p>
    </button>
  );
}
