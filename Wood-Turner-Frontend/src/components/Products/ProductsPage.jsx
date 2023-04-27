import React, { useEffect } from "react";
import useStore, { client } from "../../store/client";
import imageUrlBuilder from "@sanity/image-url";
import { RiLoader4Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Footer, Subscribe } from "../Home/Home";

const ProductsPage = () => {
  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }

  const fetchProducts = useStore((state) => state.fetchProducts);
  const products = useStore((state) => state.products);
  const addToCartFunction = useStore((state) => state.addToCartFunction);
  const loading = useStore((state) => state.loading);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="py-10 px-0 md:px-20 bg-gray-100 ">
      <div className=" h-screen">
        <div className="mt-10 px-5">
          <h1 className="font-display text-3xl font-medium text-[#542C2C]">
            Products
          </h1>
          <p>Here are some of the wooden products available for sale</p>
          <div>
            {loading ? (
              <div className="grid place-items-center md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-20">
                {products.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="bg-white w-full h-[270px]"
                    >
                      <Link to={`/products/${product.slug}`}>
                        <div>
                          <img
                            className="w-full h-[150px] object-cover"
                            src={urlFor(product.mainImage).url()}
                            alt=""
                          />
                          <div className="p-2">
                            <p className="capitalize font-semibold font-body text-xs py-1">
                              {product.name}
                            </p>
                            <p className="md:text-2xl text-sm font-semibold text-[#542C2C]">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={() => addToCartFunction(product)}
                        className="bg-[#542C2C] hover:bg-[#542C2C]/75 text-white text-center w-full py-3 cursor-pointer"
                      >
                        Add To Cart
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center gap-5">
                <p>Loading... </p>
                <RiLoader4Fill className=" animate-spin text-3xl text-center" />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Subscribe />
      <Footer /> */}
    </div>
  );
};

export default ProductsPage;
