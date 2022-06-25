import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51LEDRKDwNZZEyNd2KAypoPBKoApVUzhClPcPzP9W0Jt4WNLL0Csz8xIpTkO6GvqCXYKOzTIaF4bvahnj7hoqDGUw001tZ3oXiv";
const SECRET_KEY = "sk_test_51LEDRKDwNZZEyNd2Re4JwOKtEUvwikW1ZZqAfVsQGWqbf1goTBxotvUwRKC4wOXkFbOhmO1LnOOZlANKNnSd8tym00zJWVKjAk";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  console.log('entre a la API')
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
