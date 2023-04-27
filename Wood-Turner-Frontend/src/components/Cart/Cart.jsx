import React from "react";
import useStore, { client } from "../../store/client";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaMinus } from "react-icons/fa";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

export const Cart = ({ openCart, handleOpenCart, itemsPrice }) => {
  const cartProduct = useStore((state) => state.cartProduct);
  const addToCartFunction = useStore((state) => state.addToCartFunction);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const emptyCart = useStore((state) => state.emptyCart);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  const totalUnitPrice = (a, b) => {
    return a * b;
  };
  

  return (
    <>
      {openCart && (
        <div className="inset-0 fixed bg-gray-400/25 z-[10000]">
          <div className="md:w-1/3 w-full overflow-scroll no-scrollbar bg-white h-screen right-0 fixed p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-body text-lg font-semibold text-[#542C2C]">
                Cart ({cartProduct.length})
              </h1>
              <IoCloseSharp
                onClick={handleOpenCart}
                className="text-xl cursor-pointer"
              />
            </div>
            <div className="mt-10">
              {cartProduct.length == 0 ? (
                <div className="flex flex-col justify-center items-center gap-5">
                  <p className="text-center text-xl text-[#542C2C]">
                    Cart Empty
                  </p>
                  <Link to="/products">
                    <button
                      onClick={handleOpenCart}
                      className="cursor-pointer text-white text-md bg-[#542c2c] py-2 px-4 transition-all hover:scale-105"
                    >
                      Go to Product Page
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  {cartProduct.map((cart) => {
                    return (
                      <div
                        className="flex gap-5 relative justify-between my-3"
                        key={cart.id}
                      >
                        <img
                          className="w-full max-w-[200px] h-[200px]"
                          src={urlFor(cart.mainImage).url()}
                          alt={cart.name}
                        />
                        <div>
                          <p className=" uppercase font-semibold text-right font-body text-sm ">
                            {cart.name}
                          </p>

                          <div className=" w-full">
                            <div className="flex my-2 items-center gap-5 justify-end">
                              <button
                                onClick={() => addToCartFunction(cart)}
                                className="bg-[#542c2c] p-2 text-white"
                              >
                                <IoMdAdd />
                              </button>
                              <p className="text-sm font-semibold">
                                {cart.qty}
                              </p>
                              <button
                                onClick={() => removeFromCart(cart)}
                                className="bg-[#542c2c] p-2 text-white"
                              >
                                <FaMinus />
                              </button>
                            </div>
                            <p className="font-semibold font-body text-right text-sm">
                              ${totalUnitPrice(cart.qty, cart.price)}
                            </p>
                            <button
                              onClick={() => deleteProduct(cart)}
                              className="bg-[#542c2c] absolute bottom-0 right-0 text-center p-2 text-white"
                            >
                              <RiDeleteBinFill />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {!cartProduct.length == 0 && (
              <>
                <div className="flex items-center justify-between">
                  <button
                    onClick={emptyCart}
                    className="bg-[#542C2C] py-2 px-4 uppercase font-semibold my-4 text-md text-white"
                  >
                    Clear cart
                  </button>
                  <p className="font-body font-semibold text-sm">
                    Total: ${itemsPrice}
                  </p>
                </div>
                <div>
                  <Link to="/checkout">
                    <button className="bg-[#542C2C] cursor-pointer text-white px-2 py-2 uppercase w-full">
                      Checkout
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
