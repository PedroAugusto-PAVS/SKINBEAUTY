💄 SkinBeauty - Curso Presencial de Automaquiagem

📖 Sobre o Projeto

SkinBeauty é uma plataforma web desenvolvida para divulgação e venda de vagas para um curso presencial de automaquiagem.

O sistema permite que clientes escolham um plano, realizem o pagamento através da InfinitePay e tenham seus dados registrados automaticamente após a confirmação do pagamento.

---

✨ Funcionalidades

- Landing Page responsiva
- Design moderno e otimizado para dispositivos móveis
- Menu responsivo para celulares
- Exibição de benefícios e conteúdos do curso
- Escolha entre diferentes planos
- Integração com InfinitePay Checkout
- Redirecionamento automático após pagamento
- Webhook para confirmação de pagamentos
- Integração com Supabase
- Registro automático de clientes pagantes
- Dashboard administrativo para visualização dos alunos inscritos
- Botão de contato via WhatsApp

---

🛠 Tecnologias Utilizadas

Frontend

- HTML5
- CSS3
- JavaScript

Backend

- Node.js
- Express.js

Banco de Dados

- Supabase

Pagamentos

- InfinitePay API

Hospedagem

- Vercel (Frontend)
- Render (Backend)

---

📂 Estrutura do Projeto

SKINBEAUTY
│
├── back
│   ├── routes
│   │   ├── payment.js
│   │   ├── webhook.js
│   │   └── admin.js
│   │
│   ├── server.js
│   ├── supabase.js
│   └── package.json
│
├── public
│   ├── css
│   │   └── style.css
│   │
│   ├── js
│   │   ├── script.js
│   │   └── admin.js
│   │
│   ├── img
│   │
│   ├── index.html
│   ├── success.html
│   └── admin.html
│
└── README.md

---

💰 Planos Disponíveis

Plano Glow

- Curso presencial
- Aula prática
- Certificado
- Técnicas de automaquiagem

Plano Duo

- Atendimento mais próximo
- Técnicas personalizadas
- Certificado
- Suporte para dúvidas

Plano VIP

- Aula individual
- Atendimento exclusivo
- Técnicas personalizadas
- Cronograma exclusivo

---

🔐 Dashboard Administrativo

O sistema possui uma área administrativa protegida por senha onde é possível visualizar:

- Nome dos clientes
- E-mail
- Telefone
- Plano adquirido
- Valor pago
- Método de pagamento

Acesso:

/admin.html

---

🔄 Fluxo de Funcionamento

Cliente escolhe um plano
        ↓
Preenche os dados
        ↓
InfinitePay Checkout
        ↓
Pagamento aprovado
        ↓
Webhook recebe confirmação
        ↓
Dados gravados no Supabase
        ↓
Cliente redirecionado para tela de sucesso

---

⚙️ Variáveis de Ambiente

Backend (.env)

PORT=3000

SUPABASE_URL=SEU_SUPABASE_URL

SUPABASE_KEY=SUA_SUPABASE_SERVICE_ROLE_KEY

INFINITE_HANDLE=SEU_HANDLE_INFINITEPAY

ADMIN_PASSWORD=SUA_SENHA_ADMIN

---

🚀 Deploy

Frontend

Hospedado na Vercel:

https://skinbeauty-alpha.vercel.app

Backend

Hospedado no Render:

https://skinbeauty.onrender.com

---

📱 Responsividade

O projeto foi desenvolvido utilizando abordagem Mobile First, garantindo ótima experiência em:

- Smartphones
- Tablets
- Notebooks
- Computadores Desktop

---

👨‍💻 Autor

Pedro Augusto

Tecnólogo em Análise e Desenvolvimento de Sistemas

GitHub:
https://github.com/PedroAugusto-PAVS

LinkedIn:
https://www.linkedin.com/in/pedro-augusto-vieira-santos-780391207?utm_source=share_via&utm_content=profile&utm_medium=member_android