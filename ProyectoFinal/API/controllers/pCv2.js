import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const openStripePaymentLink = async (req, res) => {
  const url =
    process.env.NODE_ENV === "production"
      ? process.env.PROD_URL
      : process.env.DEV_URL;

 const session = await stripe.checkout.sessions.create({
    line_items: [
        {
          price_data: {
            product_data: {
              name: "Laptop",
            },
            currency: "usd",
            unit_amount: 2000,
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: "TV",
            },
            currency: "usd",
            unit_amount: 1000,
          },
          quantity: 2,
        },
      ],
    mode: "payment",
    success_url: url + "/api/payment/success",
    cancel_url: url + "/api/payment/cancel",
  });
  return res.json(session)
};
