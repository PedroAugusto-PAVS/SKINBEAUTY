const express = require('express');
const cors = require('cors');

require('dotenv').config();

const paymentRoute = require('./routes/payment');
const webhookRoute = require('./routes/webhook');
const adminRoute = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API SkinBeauty rodando ✅');
});

app.use('/payment', paymentRoute);
app.use('/webhook', webhookRoute);
app.use('/admin', adminRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando');
});