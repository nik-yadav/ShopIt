import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { API, STRIPE_PKEY } from "../backend";
import { useSelector } from "react-redux";

import StripeForm from "./StripeForm";

const stripePromise = loadStripe(`${STRIPE_PKEY}`);

function Stripe() {
  // console.log("stripe promise=", stripePromise, `stripe pkey= ${STRIPE_PKEY}`);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("clientsecret jst below=", clientSecret);
  const { token, user } = JSON.parse(localStorage.getItem("jwt"));
  const cartItems = useSelector((state) => {
    let items = [];
    state.cart.value.forEach((product) => {
      items.push({ id: product._id, quantity: product.quantity });
    });
    return items;
  });

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    fetch(`${API}/pay/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ items: cartItems /*[{ id: "xl-tshirt" }]*/ }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("backend = ", data);
        setClientSecret(res.data.clientSecret);
        setLoading(false);
      });
  }, []);

  // if (!clientSecret) console.log("Client secret=", clientSecret);
  if (loading) {
    return <p>Loading...</p>; // Render a loading indicator while waiting for the API call
  }

  return (
    <>
      {/* hello stripe <p>{clientSecret}</p> */}
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <StripeForm />
        </Elements>
      )}
    </>
  );
}

export default Stripe;
