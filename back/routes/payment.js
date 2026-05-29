const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../supabase');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, email, phone, plan } = req.body;

    const plans = {
      glow: {
        name: 'Plano Glow',
        price: 100
      },
      duo: {
        name: 'Plano Duo',
        price: 20000
      },
      vip: {
        name: 'Plano VIP',
        price: 30000
      }
    };

    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return res.status(400).json({
        error: 'Plano inválido'
      });
    }

    const orderNSU = uuidv4();

    const { error } = await supabase
      .from('orders')
      .insert([
        {
          id: orderNSU,
          customer_name: name,
          customer_email: email,
          amount: selectedPlan.price / 100,
          status: 'pending',
          payment_method: null,
          transaction_nsu: null,
          order_nsu: orderNSU,
          receipt_url: null
        }
      ]);

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    const response = await axios.post(
      'https://api.checkout.infinitepay.io/links',
      {
        handle: process.env.INFINITE_HANDLE,

        redirect_url:
          'https://skinbeauty-alpha.vercel.app/success.html',

        webhook_url:
          'https://skinbeauty.onrender.com/webhook',

        order_nsu: orderNSU,

        items: [
          {
            quantity: 1,
            price: selectedPlan.price,
            description: selectedPlan.name
          }
        ],

        customer: {
          name,
          email,
          phone_number: phone
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return res.json({
      checkoutUrl: response.data.url
    });

  } catch (error) {
    console.log(error.response?.data || error);

    return res.status(500).json({
      error: 'Erro ao criar checkout'
    });
  }
});

module.exports = router;