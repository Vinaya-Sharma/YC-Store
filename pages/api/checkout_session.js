const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {

      const data = (req.body)
   
      try {
        // Create Checkout Sessions from body params.
        let theline = []
        data.map((item) =>  { theline.push({
          price_data:{
            currency:'cad',
            product_data:{
              name:item.product.title,
            },
            unit_amount:item.product.cost*item.quantity*100
          },
          quantity:item.quantity})
        })


        const params = {
          submit_type:'pay',
          mode:'payment',
          payment_method_types:['card'],
          billing_address_collection:'auto',
          shipping_options:[
            {shipping_rate:'shr_1L2IyzAKNjPppdxIjVZxQ5gX'}
        ],
          line_items:theline,
          mode: 'payment',
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
          automatic_tax: {enabled: false},
        }
        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session)
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }}