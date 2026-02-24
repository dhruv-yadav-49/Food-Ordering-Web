const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
    async generatePaymentLink(order){
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                success_url: `http://localhost:3000/payment/success/${order._id}`,
                cancel_url: `http://localhost:3000/payment/cancel`,
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "Food Order",
                            },
                            unit_amount: Math.round(order.totalAmount * 100),
                        },
                        quantity: 1,
                    }
                ]
            });

            console.log("Payment Session Created:", session);

            return {
                payment_url: session.url,
                paymentId: session.id
            };

        } catch (error) {
            console.error("Error generating payment link:", error);
            throw new Error(error.message);
        }
    }
}
