import React, { useEffect, useState } from "react";
import NumberButton from "./LikeButton";

interface ProductInfo {
  id: string;
  image: string;
  name: string;
  likes: number;
  dislikes: number;
}

interface ProductProps {
  product: ProductInfo;
  onLike: (pid: string, like: boolean) => void;
}

export default function ProductList(): JSX.Element {
  const [products, setProducts] = useState<ProductInfo[]>([]);

  useEffect(() => updateProducts(), []);

  const onLikeEvent = async (pid: string, like: boolean) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ like }),
    };
    await fetch(`/api/v1/product/like/${pid}`, options);

    updateProducts();
  };

  const updateProducts = () => {
    fetch("/api/v1/product").then(async (res: Response) => {
      const products: ProductInfo[] = await res.json();
      setProducts(products);
    });
  };

  return (
    <div className="my-2 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <Product key={product.id} product={product} onLike={onLikeEvent} />
      ))}
    </div>
  );
}

function Product({ product, onLike }: ProductProps): JSX.Element {
  const onProductLike = (like: boolean) => onLike(product.id, like);

  return (
    <div className="px-4 pt-4 pb-3 bg-red-50 rounded-md dark:bg-green-900 shadow-md">
      <img
        src={product.image}
        alt={`${product.name} image`}
        className="object-cover h-36 w-36 mx-auto rounded"
      />
      <div>
        <p className="font-normal text-xl text-center mt-1">{product.name}</p>
        <div className="flex justify-center space-x-2 my-2">
          <div className="flex-none">
            <NumberButton
              image="up"
              num={product.likes}
              onLike={onProductLike}
            />
          </div>
          <div className="flex-none">
            <NumberButton
              image="down"
              num={product.dislikes}
              onLike={onProductLike}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
