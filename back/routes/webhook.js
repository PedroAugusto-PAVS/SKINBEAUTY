const express = require('express');
const supabase = require('../supabase');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const payment = req.body;

    console.log('WEBHOOK RECEBIDO:', payment);

    const { error } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_method: payment.capture_method,
        transaction_nsu: payment.transaction_nsu,
        receipt_url: payment.receipt_url
      })
      .eq('order_nsu', payment.order_nsu);

    if (error) {
      console.log('ERRO SUPABASE:', error);

      return res.status(500).json({
        error: error.message,
        details: error.details,
        code: error.code
      });
    }

    return res.sendStatus(200);

  } catch (error) {
    console.log('ERRO NO WEBHOOK:', error);

    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;