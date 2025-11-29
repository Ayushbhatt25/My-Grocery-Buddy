import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const ProductCart = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  const cartQuantity = cartItems[product._id] || 0;

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-700 rounded-md px-3 py-2 bg-gray-800 min-w-26 max-w-46 w-full hover:shadow-lg transition-shadow"
      >
        <div className="group cursor-pointer flex items-center justify-center px-2 bg-white rounded-md py-2 mb-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={product.images[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-400 text-sm">
          <p>{product.category}</p>
          <p className="text-white font-medium text-lg truncate w-full">
            {product.name}
          </p>

          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  className="mxd:w-3.5 w-3"
                />
              ))}
            <p>(4)</p>
          </div>

          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-primary">
              {currency}
              {product.offerPrice}{" "}
              <span className="text-gray-500 md:text-sm text-xs line-through">
                {currency}
                {product.price}
              </span>
            </p>

            <div
              className="text-primary"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!cartQuantity ? (
                <button
                  className="flex items-center justify-center gap-1 btn-white-pink-shadow md:w-[80px] w-[64px] h-[34px] rounded-md"
                  onClick={() => {
                    if (product.quantity <= 0) {
                      toast.error("Out of stock!");
                      return;
                    }
                    addToCart(product._id);
                  }}
                >
                  <img src={assets.cart_icon} alt="cart icon" className="w-4 h-4 transition-all" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer text-md px-2 h-full hover:text-white transition"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-white">{cartQuantity}</span>
                  <button
                    onClick={() => {
                      if (cartQuantity >= product.quantity) {
                        toast.error("Out of stock!");
                        return;
                      }
                      addToCart(product._id);
                    }}
                    className="cursor-pointer text-md px-2 h-full hover:text-white transition"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCart;
