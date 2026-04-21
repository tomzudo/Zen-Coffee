import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <div className="group rounded-2xl 
      backdrop-blur-md 
      p-4 transition-all duration-300">
      
      <div className="overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black">
          {name}
        </h3>

        <p className="text-sm text-black">
          Zen Coffee
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-normal text-red-600">
            R$ {price.toFixed(2)}
          </span>

          <button className="rounded-full bg-black/80 px-4 py-2 text-sm text-white hover:bg-black transition">
            Comprar
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;