import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Cart } from "./components/Cart/Cart";
import { Contact } from "./components/contact/Contact";
import { Home, Navbar } from "./components/Home/Home";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import ProductsPage from "./components/Products/ProductsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkout } from "./components/Checkout/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useStore from "./store/client";

function App() {
  const cartProduct = useStore((state) => state.cartProduct);
  const [openCart, setOpenCart] = useState(false);
  const handleOpenCart = () => {
    setOpenCart((prev) => !prev);
  };
  const [openNav, setOpenNav] = useState(false);
  const handleOpenNav = () => {
    setOpenNav((prev) => !prev);
  };
  // stripe key
  const stripePromise = loadStripe(
    "pk_test_51MzM7cA4tp430towDTa1cNpvqFIijuHUn1u8UTxb2Hf4OCAGBP3RgQE5xNRqvevurOqSyLW2DWO5Rw2FIc3W3A7H00iPcsltye"
  );

  const itemsPrice = cartProduct.reduce((a, c) => a + c.price * c.qty, 0);
  return (
    <div className="">
      <div className="capitalize z-[99999]">
        <ToastContainer position="top-left" />
      </div>
      <Navbar
        handleOpenNav={handleOpenNav}
        openNav={openNav}
        handleOpenCart={handleOpenCart}
      />
      <Routes>
        <Route
          path="/"
          index
          element={
            <>
              <Home handleOpenCart={handleOpenCart} />
              <Cart
                itemsPrice={itemsPrice}
                openCart={openCart}
                handleOpenCart={handleOpenCart}
              />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <ProductsPage />
              <Cart
                itemsPrice={itemsPrice}
                openCart={openCart}
                handleOpenCart={handleOpenCart}
              />
            </>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <>
              <ProductInfo />
              <Cart
                itemsPrice={itemsPrice}
                openCart={openCart}
                handleOpenCart={handleOpenCart}
              />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Contact />
              <Cart
                itemsPrice={itemsPrice}
                openCart={openCart}
                handleOpenCart={handleOpenCart}
              />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <Checkout
                handleOpenCart={handleOpenCart}
                itemsPrice={itemsPrice}
              />
            </Elements>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
