import React from "react";
import NumberButton from "./NumberButton";

interface Product {
  id: string;
  image: string;
  name: string;
}

const samples: Product[] = [
  {
    id: "1",
    image: "https://avatars.githubusercontent.com/u/17609064?v=4",
    name: "Mimikyu",
  },
  {
    id: "2",
    image: "https://avatars.githubusercontent.com/u/1983338?v=4",
    name: "Pairi",
  },
  {
    id: "3",
    image: "https://avatars.githubusercontent.com/u/20296205?v=4",
    name: "Yadoran",
  },
  {
    id: "4",
    image: "https://avatars.githubusercontent.com/u/17609064?v=4",
    name: "Pikachu",
  },
];

export default function ProductList(): JSX.Element {
  return (
    <div className="my-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {samples.map((sample) => (
        <Product key={sample.id} {...sample} />
      ))}
    </div>
  );
}

function Product(product: Product): JSX.Element {
  return (
    <div className="px-4 pt-4 pb-3 bg-red-50 rounded-md">
      <img
        src={product.image}
        alt={`${product.name} image`}
        className="object-cover h-36 w-36 mx-auto rounded"
      />
      <div>
        <p className="font-bold text-xl text-center mt-1">{product.name}</p>
        <div className="flex justify-center space-x-2 my-2">
          <div className="flex-none">
            <NumberButton image="up" num={0} />
          </div>
          <div className="flex-none">
            <NumberButton image="down" num={0} />
          </div>
        </div>
      </div>
    </div>
  );
}
