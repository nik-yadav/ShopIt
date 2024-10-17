const { STRIPE_SK } = require("../config");
const product = require("../models/product");
const stripe = require("stripe")(`${STRIPE_SK}`);
const Product = require("../models/product");

async function calculateOrderAmount(cart) {
  // console.log("caart = ", cart);
  let cartTotal = 0;
  // cart = cart.map(async (item) => {
  //   return await Product.findById(item);
  // });

  const productPromises = cart.map(async (item) => {
    const product = await Product.findById(item.id);
    // console.log(product);
    cartTotal += product.price * item.quantity;
  });

  // cart.forEach(async (productId) => {
  //   const product = await Product.findById(productId);
  //   console.log(product);
  //   cartTotal += product.price;
  // });

  await Promise.all(productPromises);

  // console.log("cartTotal=", cartTotal);

  return cartTotal;
}

exports.makePayment = async function (req, res) {
  try {
    // let lineItems = [];
    // req.body.cart.forEach(async (product) => {
    //   const result = await Product.findById(product.id);
    //   const obj = {
    //     price_data: {
    //       currency: "INR",
    //       product_data: {
    //         name: result.name,
    //       },
    //       unit_amount: result.price,
    //     },
    //     quantity: product.quantity,
    //   };
    //   lineItems.push(obj);
    // });
    // const session = await stripe.checkout.sessions.create({
    //   // success_url: 'https://localhost:3000/api/success',
    //   // return_url:,
    //   // cancel_url:,
    //   // line_items: [
    //   //   {
    //   //     price_data: {
    //   //         currency: 'INR',
    //   //         product:req.product,
    //   //         // product_data:{
    //   //         //     name: ,
    //   //         // }
    //   //         unit_amount: ,
    //   //     },
    //   //     quantity: 2,
    //   //   },
    //   // ],
    //   line_items: lineItems,
    //   mode: "payment",
    // });
    let cartTotal = await calculateOrderAmount(req.body.items);
    console.log("carttoatal = ", cartTotal);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartTotal,
      currency: "inr",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    });

    return res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    console.log("an error occured during payment");
    res.status(500).json({
      success: false,
      data: {},
    });
  }
};
