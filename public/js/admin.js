const loginBtn = document.getElementById("loginBtn");
const result = document.getElementById("result");

loginBtn.addEventListener("click", async () => {
  const password = document.getElementById("password").value;

  const response = await fetch("https://skinbeauty.onrender.com/admin/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.error || "Erro ao carregar pedidos");
    return;
  }

  result.innerHTML = `
<div class="total-box">
  <span>Total de clientes</span>
  <h2>${data.length}</h2>
</div>

<div class="cards-container">
${data
  .map(
    (order) => `
  <div class="client-card">

    <h3>${order.customer_name}</h3>

    <p><strong>📧 Email:</strong><br>
    ${order.customer_email}</p>

    <p><strong>📱 Telefone:</strong><br>
    ${order.customer_phone}</p>

    <p><strong>💰 Valor:</strong><br>
    R$ ${Number(order.amount).toFixed(2)}</p>

    <span class="plan-tag">
      ${order.plan}
    </span>

  </div>
`
  )
  .join("")}
</div>
`;
});
