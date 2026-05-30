const express = require('express');
const supabase = require('../supabase');

const router = express.Router();

router.post('/orders', async (req, res) => {
  try {
    const { password } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        error: 'Senha inválida'
      });
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.json(data);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;