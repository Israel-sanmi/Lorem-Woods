import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store/client";

export const Checkout = ({ itemsPrice, handleOpenCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const emptyCart = useStore((state) => state.emptyCart);

  const cardElementOptions = {
    classes: {
      base: "px-4 py-2 rounded-lg border-gray-300 placeholder-gray-500",
      focus: "outline-none border-blue-500",
      invalid: "border-red-500",
    },
    supportedCountries: ["US"],
    hidePostalCode: true,
    iconStyle: "solid",
    // options: {
    //   paymentMethodType: ["card"],
    //   allowedCardTypes: ["visa", "mastercard", "amex", "discover"],
    // },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name,
        email,
      },
    });

    if (error) {
      console.log(error);
    } else {
      console.log(paymentMethod);
      toast.success("Payment successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      emptyCart();
      // navigate('/')
    }
  };
  return (
    <div className="md:px-20 px-10 py-20 h-screen">
      <h1 className="text-center uppercase font-semibold font-display">
        Checkout
      </h1>
      <p className="font-semibold font-body text-xs text-right py-5">
        Total Price: ${itemsPrice}
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full placeholder-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cardElement"
              className="block text-gray-700 font-bold mb-2"
            >
              Card details:
            </label>
            <CardElement id="cardElement" options={cardElementOptions} />
          </div>{" "}
          <button
            type="submit"
            className="bg-blue-500 text-white w-full font-bold py-2 px-4 rounded"
          >
            Pay
          </button>
          <span
            onClick={() => {
              navigate("/");
              handleOpenCart()
            }}
          >
            <p className="text-sm font-semibold text-right mt-5">
              Back to Home
            </p>
          </span>
        </form>
      </div>
    </div>
  );
};
