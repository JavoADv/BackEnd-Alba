const router = require('express').Router();
const SECRET_STRIPE_KEY = process.env.SECRET_STRIPE_KEY;
const stripe = require('stripe')(SECRET_STRIPE_KEY);


router.get('/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    res.send(`<html><body><h1>Gracias por suscribirte ${customer.name} :D!</h1></body></html>`);
    res.end()
});

router.get('/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await stripe.customers.retrieve(id);
        res.status(200).json({
            sucess: true,
            message: 'Subscription by id',
            data: {
                subscription
            }
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: 'Subscription by id failed request',
            data: null
        })
    }
})

router.get('/subscriptions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await stripe.subscriptions.retrieve(id);
        res.status(200).json({
            sucess: true,
            message: 'Subscription by id',
            data: {
                subscription
            }
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: 'Subscription by id failed request',
            data: null
        })
    }
})

router.delete('/subscriptions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const canceledSub = await stripe.subscriptions.del(id);
        res.status(200).json({
            sucess: true,
            message: 'Subscription cancel request successfully',
            data: {
                canceledSub
            }
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: 'Subscription canceled failure',
            data: null
        })
    }
})

router.get('/canceled', async (req, res) => {
    res.send(`<html><body><h1>Process canceled</h1></body></html>`);
    res.end()
});


router.post('/create-checkout-session', async (req, res) => {
    const { priceId } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: 'http://localhost:8080/stripe/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:8080/stripe/canceled',
        });

        res.send({
            sessionId: session.id,
        });
    } catch (e) {
        res.status(400);
        return res.send({
            error: {
                message: e.message,
            }
        });
    }
});

module.exports = router;
