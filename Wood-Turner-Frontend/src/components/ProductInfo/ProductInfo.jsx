import React, { useState, useEffect } from "react";
import { Footer, Subscribe } from "../Home/Home";
import { useParams } from "react-router-dom";
import useStore, { client } from "../../store/client";
import imageUrlBuilder from "@sanity/image-url";

const ProductInfo = () => {
  const { productId } = useParams();

  const clearSelectedProduct = useStore((state) => state.clearSelectedProduct);
  const selectProductBySlug = useStore((state) => state.selectProductBySlug);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const addToCartFunction = useStore((state) => state.addToCartFunction);

  useEffect(() => {
    selectProductBySlug(productId);
    return () => {
      clearSelectedProduct();
    };
  }, [productId, selectProductBySlug, clearSelectedProduct]);

  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  return (
    <>
      {selectedProduct.gallery && (
        <div className="py-5 pt-20 md:px-20 px-10 bg-gray-100 h-full">
          <div className="md:flex block items-center gap-10" >
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <img
                  src={urlFor(selectedProduct?.gallery[0]).url()}
                  className="w-full max-w-[150px] object-cover h-[220px]"
                  alt=""
                />
                <img
                  src={urlFor(selectedProduct?.gallery[1]).url()}
                  className="w-full max-w-[150px] object-cover h-[220px]"
                  alt=""
                />
                <img
                  src={urlFor(selectedProduct?.gallery[2]).url()}
                  className="w-full max-w-[150px] object-cover h-[220px]"
                  alt=""
                />
              </div>
              <img
                src={urlFor(selectedProduct.mainImage).url()}
                className="h-[678px] w-full"
                alt=""
              />
            </div>
            <div className="flex md:w-1/2 w-full mt-5 md:mt-0 flex-col gap-7">
              <div className="flex flex-col gap-7">
                <h1 className="font-display capitalize text-4xl">
                  {selectedProduct?.name}
                </h1>
                <p className="font-body text-2xl font-semibold">
                  ${selectedProduct?.price}
                </p>
                <p className="text-md">{selectedProduct?.description}</p>
              </div>
              {/* <div className="flex items-center gap-7">
          <p className="text-lg">Quantity</p>
          <div className="flex border-2 border-[#542C2C] w-full justify-between py-2 px-2 items-center">
            <FaMinus className="cursor-pointer" /> 5{" "}
            <IoMdAdd className="cursor-pointer" />
          </div>
        </div> */}
              <button
                onClick={() => addToCartFunction(selectedProduct)}
                className="bg-[#542C2C] hover:bg-[#542C2C]/75 text-white uppercase py-3 font-semibold cursor-pointer"
              >
                Add To Cart
              </button>
            </div>
          </div>
          <Subscribe />
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductInfo;
