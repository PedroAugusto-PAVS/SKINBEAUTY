const buttons = document.querySelectorAll('.payBtn');

buttons.forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      const plan = button.dataset.plan;

      button.disabled = true;
      button.innerText = 'Carregando...';

      const response = await fetch(
        'https://skinbeauty.onrender.com/payment/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: 'Cliente',
            email: 'cliente@email.com',
            phone: '62999999999',
            plan: plan
          })
        }
      );

      const data = await response.json();

      console.log('Resposta do backend:', data);

      if (!response.ok) {
        alert(data.error || 'Erro ao criar checkout');
        return;
      }

      if (!data.checkoutUrl) {
        alert('Backend não retornou checkoutUrl');
        return;
      }

      window.location.href = data.checkoutUrl;

    } catch (error) {
      console.log('Erro no fetch:', error);
      alert('Erro no pagamento');

    } finally {
      button.disabled = false;
      button.innerText = 'Garantir Minha Vaga';
    }
  });
});