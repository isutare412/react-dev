import React from "react";
import logo from "../resource/dev-ground.png";

interface BrandLogoProps {
  href: string;
}

export default function BrandLogo({ href }: BrandLogoProps): JSX.Element {
  return (
    <a href={href}>
      <img src={logo} className="h-10 my-auto hidden sm:block" />;
    </a>
  );
}
