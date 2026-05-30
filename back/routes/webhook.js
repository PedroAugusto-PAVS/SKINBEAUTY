const express = require('express');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../supabase');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const payment = req.body;

    console.log('WEBHOOK RECEBIDO:', payment);

    const { data: session, error: sessionError } = await supabase
      .from('checkout_sessions')
      .select('*')
      .eq('order_nsu', payment.order_nsu)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({
        error: 'Sessão de checkout não encontrada'
      });
    }

    const { error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          id: uuidv4(),
          customer_name: session.customer_name,
          customer_email: session.customer_email,
          customer_phone: session.customer_phone,
          plan: session.plan,
          amount: session.amount,
          status: 'paid',
          payment_method: payment.capture_method,
          transaction_nsu: payment.transaction_nsu,
          order_nsu: payment.order_nsu,
          receipt_url: payment.receipt_url
        }
      ]);

    if (orderError) {
      return res.status(500).json({
        error: orderError.message,
        details: orderError.details,
        code: orderError.code
      });
    }

    await supabase
      .from('checkout_sessions')
      .delete()
      .eq('order_nsu', payment.order_nsu);

    return res.sendStatus(200);

  } catch (error) {
    console.log('ERRO NO WEBHOOK:', error);

    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;