const loginBtn = document.getElementById('loginBtn');
const result = document.getElementById('result');

loginBtn.addEventListener('click', async () => {
  const password = document.getElementById('password').value;

  const response = await fetch(
    'https://skinbeauty.onrender.com/admin/orders',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    alert(data.error || 'Erro ao carregar pedidos');
    return;
  }

  result.innerHTML = `
    <h2>Clientes pagantes</h2>

    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Plano</th>
          <th>Valor</th>
          <th>Pagamento</th>
        </tr>
      </thead>

      <tbody>
        ${data.map(order => `
          <tr>
            <td>${order.customer_name || ''}</td>
            <td>${order.customer_email || ''}</td>
            <td>${order.customer_phone || ''}</td>
            <td>${order.plan || ''}</td>
            <td>R$ ${Number(order.amount).toFixed(2)}</td>
            <td>${order.payment_method || ''}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
});