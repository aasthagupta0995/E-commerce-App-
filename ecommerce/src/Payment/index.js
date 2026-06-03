import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';    
import cors from 'cors';
import fs from 'fs';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_KEY?.trim().replace(/^['"]|['"]$/g, '');
const stripeClient = stripeSecretKey ? new stripe(stripeSecretKey) : null;

const app = express();
app.use(cors()) // Enable CORS for all routes

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Payment API listening on http://localhost:${port}`);
});
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// open stripe setup account 
// get api keys from stripe dashboard - developers menu
// integrate stripe payment gateway in frontend and backend



app.post('/generate-payment-link', async (req,res) => {
   try{
    if (!stripeClient) {
        return res.status(500).json({
            error: 'Stripe server key is missing. Set STRIPE_KEY in .env before starting the API server.'
        });
    }

    const amount = Number(req.body.amount);
    const productName = req.body.productName || 'Order item';
    const customerEmail = req.body.customerEmail;
    const clientOrigin = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';

    if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount. Provide a positive number.' });
    }

    const session = await stripeClient.checkout.sessions.create({
        mode: 'payment',
        customer_email: customerEmail,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: productName,
                    },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            },
        ],  
        success_url: `${clientOrigin}/user/payment/success`,
        cancel_url: `${clientOrigin}/user/payment/fail`,
    })
    res.json({url: session.url})

   }
   catch(err){  
        res.status(500).json({error: err.message})
    }
})
// go to stripe and there webhook set up local listener url as http://localhost:8080/webhook and select event as checkout.session.completed
// download stripe cli
// cmd - stripe login
// allow acces stripe account mail 
// forward events to destination
//trigger events CLI



app.post('/webhook', (req,res) => {
   try{
    const paymentData = JSON.stringify(req.body , null , 2);
    fs.writeFileSync('paymentData.json', paymentData);
    res.json({message: 'Request received from stripe'})


   }
    catch(err){
        res.status(500).json({error: err.message})
    }


})