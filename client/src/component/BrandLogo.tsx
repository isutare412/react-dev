import React from "react";

interface BrandLogoProps {
  onClick: () => void;
}

export default function BrandLogo({ onClick }: BrandLogoProps): JSX.Element {
  return (
    <button onClick={onClick} className="block my-auto">
      <p className="text-3xl align-middle font-title focus:outline-none transition-colors hover:text-red-400 dark:hover:text-green-500 active:text-red-500 dark:active:text-green-600">
        DevGround
      </p>
    </button>
  );
}
