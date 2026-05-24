const buttons =
document.querySelectorAll('.payBtn');

buttons.forEach((button) => {

  button.addEventListener(
    'click',

    async () => {

      try {

        const plan =
          button.dataset.plan;

        const response = await fetch(
          'http://localhost:3000/payment/create',

          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({

              name: 'Cliente',

              email: 'cliente@email.com',

              phone: '62999999999',

              plan: plan
            })
          }
        );

        const data =
          await response.json();

        console.log(data);

        if (data.checkoutUrl) {

          window.location.href =
            data.checkoutUrl;

        } else {

          alert(
            'Erro ao criar checkout'
          );
        }

      } catch (error) {

        console.log(error);

        alert('Erro no pagamento');
      }
    }
  );
});