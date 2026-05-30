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
        price: 15000
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

    if (!name || !email || !phone) {
      return res.status(400).json({
        error: 'Preencha nome, email e telefone'
      });
    }

    const orderNSU = uuidv4();

    const { error: sessionError } = await supabase
      .from('checkout_sessions')
      .insert([
        {
          id: orderNSU,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          plan: selectedPlan.name,
          amount: selectedPlan.price / 100,
          order_nsu: orderNSU
        }
      ]);

    if (sessionError) {
      return res.status(500).json({
        error: sessionError.message
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