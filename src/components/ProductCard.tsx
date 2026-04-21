import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <div className="group rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* IMAGEM */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* INFO */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black text-montserrat">
          {name}
        </h3>

        <p className="text-sm text-gray-600">
          Oversized
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-weight:normal text-red-500">
            R$ {price.toFixed(2)}
          </span>

          <button className="rounded-full bg-black px-4 py-2 text-sm text-white text-montserrat hover:bg-zinc-800 transition">
            Comprar
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;