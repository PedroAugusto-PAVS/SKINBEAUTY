const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

const buttons = document.querySelectorAll('.payBtn');

const modal =
document.getElementById('checkoutModal');

const closeModal =
document.getElementById('closeModal');

const checkoutForm =
document.getElementById('checkoutForm');

let selectedPlan = null;

buttons.forEach((button) => {

  button.addEventListener('click', () => {

    selectedPlan =
      button.dataset.plan;

    modal.classList.add('active');

  });

});

closeModal.addEventListener('click', () => {

  modal.classList.remove('active');

});

checkoutForm.addEventListener(
  'submit',

  async (event) => {

    event.preventDefault();

    const name =
      document.getElementById(
        'customerName'
      ).value;

    const email =
      document.getElementById(
        'customerEmail'
      ).value;

    const phone =
      document.getElementById(
        'customerPhone'
      ).value;

    try {

      const response =
        await fetch(
          'https://skinbeauty.onrender.com/payment/create',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              name,
              email,
              phone,
              plan:
                selectedPlan
            })
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        alert(
          data.error ||
          'Erro ao criar checkout'
        );

        return;
      }

      window.location.href =
        data.checkoutUrl;

    } catch (error) {

      console.log(error);

      alert(
        'Erro no pagamento'
      );

    }

  }
);