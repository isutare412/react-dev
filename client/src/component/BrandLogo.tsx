import React from "react";
import logo from "../resource/dev-ground.png";

interface BrandLogoProps {
  onClick: () => void;
}

export default function BrandLogo({ onClick }: BrandLogoProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center">
      <button onClick={onClick} className="block">
        <img src={logo} className="h-10 my-auto" />
      </button>
    </div>
  );
}
