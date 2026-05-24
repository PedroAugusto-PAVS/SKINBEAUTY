const express = require('express');
const cors = require('cors');

require('dotenv').config();

const paymentRoute =
require('../routes/payment');

const webhookRoute =
require('../routes/webhook');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/payment', paymentRoute);

app.use('/webhook', webhookRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `Servidor rodando na porta ${process.env.PORT}`
  );
});