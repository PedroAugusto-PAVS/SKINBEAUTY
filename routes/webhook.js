const express = require('express');

const crypto = require('crypto');

const supabase =
require('../supabase');

const router = express.Router();

router.post('/', async (req, res) => {

  try {

    console.log(req.body);

    const payment = req.body;

    const { error } =
      await supabase
      .from('orders')
      .insert([
        {
          id:
            crypto.randomUUID(),

          customer_name:
            payment.customer?.name || '',

          customer_email:
            payment.customer?.email || '',

          amount:
            payment.amount / 100,

          status:
            'paid',

          payment_method:
            payment.capture_method,

          transaction_nsu:
            payment.transaction_nsu,

          order_nsu:
            payment.order_nsu,

          receipt_url:
            payment.receipt_url
        }
      ]);

    if (error) {

      console.log(error);

      return res.sendStatus(500);
    }

    console.log('SALVO NO SUPABASE');

    return res.sendStatus(200);

  } catch (error) {

    console.log(error);

    return res.sendStatus(500);
  }
});

module.exports = router;


