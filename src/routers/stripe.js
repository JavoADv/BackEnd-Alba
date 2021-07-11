const router = require('express').Router();
const SECRET_STRIPE_KEY = process.env.SECRET_STRIPE_KEY;
const stripe = require('stripe')(SECRET_STRIPE_KEY);
const userUsesCases = require('../usecases/users');
const authMiddlewares = require('../middlewares/auth');


router.get('/success', authMiddlewares.auth, async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const subscription = await stripe.subscriptions.retrieve(session.subscription);

    const { auth } = req.headers;
    if (!auth) {
        res.status(400).json({
            sucess: false,
            message: 'No auth',
            data: null
        })
        return;
    }

    /* SE AGREGA SUBSCRIPTION_ID AL USUARIO LOGGEADO */
    const user = await userUsesCases.getProfile(auth);
    const updatedUser = await userUsesCases.updateById(user._id, { subscriptionId: subscription.id });
    res.send(`<html><body><h1>Gracias por suscribirte ${user.name}!</h1></body></html>`);
    res.end();
});

router.get('/success/completed-subscription', authMiddlewares.auth, async (req, res) => {
    const { auth } = req.headers;
    if (!auth) {
        res.status(400).json({
            sucess: false,
            message: 'No auth',
            data: null
        })
        return;
    }
    /* SE AGREGA SUBSCRIPTION_ID AL USUARIO LOGGEADO */
    const user = await userUsesCases.getProfile(auth);
    res.redirect('/success/completed-subscription');
    res.send(`<html><body><h1>Gracias por suscribirte ${user.name}!</h1></body></html>`);
    res.end();
});

router.get('/subscription', authMiddlewares.auth, async (req, res) => {
    try {
        const { auth } = req.headers;
        if (!auth) {
            res.status(400).json({
                sucess: false,
                message: 'No auth',
                data: null
            })
            return;
        }

        const user = await userUsesCases.getProfile(auth);

        /* Traer la data de la subscripcion */
        const { subscriptionId } = user;
        if (!subscriptionId) {
            res.status(400).json({
                sucess: false,
                message: 'No Subscription Id',
                data: null
            })
            return;
        }
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
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
            message: error.message,
            data: null
        })
    }
})

router.delete('/subscriptions/:id', authMiddlewares.auth, async (req, res) => {
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
            message: error.message,
            data: null
        })
    }
})

router.get('/canceled', authMiddlewares.auth, async (req, res) => {
    res.send(`<html><body><h1>Process canceled</h1></body></html>`);
    res.end()
});

router.post('/create-checkout-session', authMiddlewares.auth, async (req, res) => {
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
            success_url: 'https://dev-alba.herokuapp.com' + '/stripe/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://dev-alba.herokuapp.com' + '/stripe/canceled',
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
