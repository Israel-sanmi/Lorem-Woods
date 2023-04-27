import React, { useState, useEffect } from "react";
import { categoryImage } from "../../data/data";
import useStore from "../../store/client";
import imageUrlBuilder from "@sanity/image-url";
import { RiLoader4Fill, RiMenu2Fill } from "react-icons/ri";
import { BsBag, BsBagFill, BsFillCartPlusFill, BsX } from "react-icons/bs";
import { client } from "../../store/client";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="">
      <Hero />
      <Catergories />
      <Products />
      <div className="py-5 md:px-20 px-10">
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};

export const Navbar = ({ handleOpenCart, handleOpenNav, openNav }) => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 40) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  const cartProduct = useStore((state) => state.cartProduct);
  return (
    <>
      <div
        className={
          !navbar
            ? "flex py-5 md:px-20 px-10 bg-white/75 font-body fixed w-full items-center justify-between"
            : "bg-[#542C2C] z-50 font-body fixed w-full text-white flex py-5 md:px-20 px-10 items-center justify-between"
        }
      >
        <Link to="/">
          <span
            className={
              !navbar
                ? "text-[#542C2C] font-display cursor-pointer text-[20px] font-medium"
                : "text-white text-[20px] font-display cursor-pointer font-medium"
            }
          >
            Lorem Woods
          </span>
        </Link>
        <span>
          <ul className="md:flex hidden items-center gap-10">
            <li className="cursor-pointer hover:scale-105 transition-all">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:scale-105 transition-all">
              <Link to="/products">Products</Link>
            </li>
            <li className="cursor-pointer hover:scale-105 transition-all">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </span>
        <span className="flex items-center gap-3">
          <span className="md:hidden block">
            <span className="">
              {cartProduct.length > 0 ? (
                <span className="flex items-center" onClick={handleOpenCart}>
                  <BsBagFill />
                  <p className="text-xs">{cartProduct.length}</p>
                </span>
              ) : (
                <span className="flex items-center" onClick={handleOpenCart}>
                  <BsBag />
                  <p className="text-xs">{cartProduct.length}</p>
                </span>
              )}
            </span>
          </span>
          <span className="md:flex hidden items-center gap-10">
            <p
              onClick={handleOpenCart}
              className="cursor-pointer hover:scale-105 transition-all"
            >
              Cart ({cartProduct.length})
            </p>
          </span>
          <span onClick={handleOpenNav} className="md:hidden block">
            {!navbar ? (
              <RiMenu2Fill className="text-xl text-[#542C2C]" />
            ) : (
              <RiMenu2Fill className="text-xl text-white" />
            )}
          </span>
        </span>
      </div>
      <span>
        <MobileNavOptions openNav={openNav} handleOpenNav={handleOpenNav} />
      </span>
    </>
  );
};

export const MobileNavOptions = ({ openNav, handleOpenNav }) => {
  return (
    <>
      {openNav && (
        <div className="h-full md:hidden block z-[9999] bg-[#542C2C]/25 inset-0 fixed">
          <div className="w-4/6 h-full px-10 absolute right-0 bg-slate-100">
            <span className="absolute right-2 top-2" onClick={handleOpenNav}>
              <BsX className="text-red-500 text-3xl" />
            </span>
            <div className="mt-20">
              <ul className="text-center uppercase font-semibold flex flex-col gap-5">
                <li onClick={handleOpenNav} className="">
                  <Link to="/">Home</Link>
                </li>
                <li onClick={handleOpenNav} className="">
                  <Link to="/products">Products</Link>
                </li>
                <li onClick={handleOpenNav} className="">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Hero = () => {
  return (
    <div className=" bg-hero-pattern bg-fixed bg-no-repeat bg-cover md:px-20 px-10">
      <div className="flex md:h-screen h-[80vh] gap-10 flex-col justify-center items-center">
        <h1 className="text-3xl md:hidden block uppercase font-display text-center font-normal leading-13 text-white">
          Create the Perfect design for your Wooden Decorations.
        </h1>
        <h1 className="text-5xl md:block hidden uppercase font-display text-center font-normal leading-13 text-white">
          Create the Perfect design for your <br /> Wooden Decorations.
        </h1>
        <p className="md:text-lg text-sm text-white font-body text-center">
          Beautiful designs that encourage you to desire more.
        </p>
        <Link to="/products">
          <button className="bg-[#542C2C] transition-all px-14 text-xs font-semibold py-5 text-white uppercase outline-none">
            Shop now
          </button>
        </Link>
      </div>
    </div>
  );
};

export const Catergories = () => {
  return (
    <div className="mt-20 py-5 px-10 md:px-20">
      <h1 className=" text-center font-display text-xl md:text-[36px] text-[#542C2C] pb-10">
        Categories
      </h1>
      <div className="flex gap-2 md:gap-5 items-center justify-between">
        {categoryImage.map((singleImg) => {
          return (
            <div
              className="w-[276px] h-[200px] md:h-[294px]"
              key={singleImg.image}
            >
              <img
                className="w-[276px] cursor-pointer transition-all object-cover h-[200px] md:h-[294px] hover:brightness-75"
                src={singleImg.image}
                alt={singleImg.cateType}
              />

              <p className="pt-2 sm:text-sm text-xs md:text-lg font-display">
                {singleImg.cateType}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Products = () => {
  const products = useStore((state) => state.products);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const loading = useStore((state) => state.loading);
  const addToCartFunction = useStore((state) => state.addToCartFunction);

  useEffect(() => {
    fetchProducts();
  }, []);

  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }

  return (
    <div className=" bg-[#542C2C]/50 h-full py-5 px-10 md:px-20 mt-32">
      <p className="text-xs font-bold text-white">Products</p>
      <h1 className="text-center text-white font-display text-lg md:text-[36px] pt-4">
        Here are some of my works that are up for sale!
      </h1>

      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            <div>
              <h1 className="font-display text-2xl md:text-4xl">Featured</h1>
              <p className="font-body text-sm py-5 text-white">
                Our woods are 100% organic, we do not use pesticide or
                anyharmful chemicals. <br /> <br /> Please do not eat them
              </p>
              <Link to="/products">
                <button className="bg-white text-black cursor-pointer border-b-2 w-full md:w-1/2 border-b-black py-2 px-3">
                  All Products
                </button>
              </Link>
            </div>
            {products.slice(0, 3).map((product) => {
              return (
                <Link key={product.id} to={`/products/${product.slug}`}>
                  <div className="cursor-pointer transition-all hover:scale-105 hover:bg-gray-50">
                    <div className="">
                      <img
                        className="w-full object-cover h-[250px] md:h-[394px]"
                        src={urlFor(product.mainImage).url()}
                      />
                      <div className="flex px-2 justify-between">
                        <div>
                          <p className="uppercase font-body text-sm md:text-lg mt-5 text-[#542C2C] font-medium">
                            {product.name}
                          </p>
                          <p className="md:font-display font-body mt-3 font-semibold text-xs md:text-lg">
                            ${product.price}
                          </p>
                        </div>
                        <button
                          onClick={() => addToCartFunction(product)}
                          className=""
                        >
                          <BsFillCartPlusFill className="text-lg text-[#542C2C]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <h5 className="flex items-center justify-center font-body pt-10">
            <RiLoader4Fill className=" animate-spin text-xl md:text-3xl text-center" />
            <p>Loading...</p>
          </h5>
        )}
      </div>
    </div>
  );
};

export const Subscribe = () => {
  return (
    <div className="mt-20 text-center">
      <h1 className="font-display text-lg md:text-[24px]">
        Get 15% off your next order
        <br />
        Subscribe to our Newsletter
      </h1>
      <div className="mt-5">
        <input
          type="text"
          placeholder="Enter your email here"
          className="bg-[#EEEEEE] placeholder:font-display placeholder:text-sm py-3 w-full md:w-1/2 px-2 md:px-9"
        />{" "}
        <button className="bg-[#542C2C] text-white py-3 -ml-2 px-4 cursor-pointer">
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <div className="mt-20 gap-5 md:gap-10 grid grid-cols-2 md:grid-cols-4 place-items-center">
      <div>
        <h1 className="text-[#542C2C] inline-block font-display cursor-pointer text-[20px] font-semibold">
          Lorem Woods
        </h1>
      </div>
      <div>
        <p className="font-body text-sm pb-2 text-gray-400">Connect</p>
        <div>
          <ul className="font-display text-md">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Pinterest</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
      <div>
        <p className="font-body text-sm pb-2 text-gray-400">Resources</p>
        <div>
          <ul className="font-display tex-md">
            <li>Retrurn Poilcy</li>
            <li>Track An Order</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div>
        <p className="font-body text-sm pb-2 text-gray-400">About</p>
        <div>
          <ul className="font-display tex-md">
            <li>Our Story</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
