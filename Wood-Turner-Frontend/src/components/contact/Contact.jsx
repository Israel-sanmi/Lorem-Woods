import React from "react";
import { Footer, Subscribe } from "../Home/Home";

export const Contact = () => {
  return (
    <div className="bg-gray-100 h-full py-20 px-10 md:px-20">
      <h1 className="font-body text-xs font-semibold uppercase">Contact</h1>
      <div>
        <p className="font-display py-5">
          For more details and/or enquiries, <br /> call or send an email to
          these numbers:
        </p>
        <p className="font-body py-5">Tel: +234 00 000 000</p>
        <p className="font-body">Email: loremipsumwood@gmail.com</p>
        <p className="font-body">
          Address: 100, Lorem Ipsum, lorem ipsum, Lorem Ipsum.
        </p>
      </div>
      <Subscribe/>
      <Footer />
    </div>
  );
};
