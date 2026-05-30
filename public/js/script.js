const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

const buttons = document.querySelectorAll('.payBtn');
const modal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const checkoutForm = document.getElementById('checkoutForm');

let selectedPlan = null;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedPlan = button.dataset.plan;

    if (!selectedPlan) {
      alert('Plano não encontrado.');
      return;
    }

    modal.classList.add('active');
  });
});

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('customerName')?.value.trim();
    const email = document.getElementById('customerEmail')?.value.trim();
    const phone = document.getElementById('customerPhone')?.value.trim();

    if (!name || !email || !phone) {
      alert('Preencha nome, e-mail e telefone.');
      return;
    }

    const payload = {
      name,
      email,
      phone,
      plan: selectedPlan
    };

    console.log('DADOS ENVIADOS:', payload);

    try {
      const response = await fetch(
        'https://skinbeauty.onrender.com/payment/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      console.log('RESPOSTA BACKEND:', data);

      if (!response.ok) {
        alert(data.error || 'Erro ao criar checkout');
        return;
      }

      if (!data.checkoutUrl) {
        alert('Checkout não retornado pelo backend.');
        return;
      }

      window.location.href = data.checkoutUrl;

    } catch (error) {
      console.log('ERRO NO PAGAMENTO:', error);
      alert('Erro no pagamento');
    }
  });
}