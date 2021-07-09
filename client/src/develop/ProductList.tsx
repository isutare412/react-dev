import React, { useEffect, useState } from "react";
import NumberButton from "./NumberButton";

interface ProductInfo {
  id: string;
  image: string;
  name: string;
  likes: number;
  dislikes: number;
}

export default function ProductList(): JSX.Element {
  const [products, setProducts] = useState<ProductInfo[]>([]);

  useEffect(() => {
    fetch("/api/v1/product").then(async (res: Response) => {
      const products: ProductInfo[] = await res.json();
      setProducts(products);
    });
  }, []);

  return (
    <div className="my-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}

function Product(product: ProductInfo): JSX.Element {
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
