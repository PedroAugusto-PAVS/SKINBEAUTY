# SkinBeauty

[![HTML5](https://img.shields.io/badge/frontend-HTML%20%7C%20CSS%20%7C%20JS-E34F26)](./public)
[![Node.js](https://img.shields.io/badge/backend-Node.js-339933)](./back)
[![Supabase](https://img.shields.io/badge/database-Supabase-3ECF8E)](./back)
[![Licença MIT](https://img.shields.io/badge/licença-MIT-green.svg)](./LICENSE)

Plataforma web para divulgação e venda de vagas de um curso presencial de automaquiagem. O projeto integra landing page responsiva, checkout InfinitePay, confirmação por webhook, persistência no Supabase e dashboard administrativo.

## Links

- **Aplicação:** https://skinbeauty-alpha.vercel.app
- **API:** https://skinbeauty.onrender.com

> Os serviços podem levar alguns segundos para responder após períodos de inatividade, conforme o plano da hospedagem.

## Funcionalidades

- Landing page responsiva com abordagem mobile-first.
- Apresentação do curso, benefícios e planos.
- Coleta dos dados do participante.
- Integração com o checkout da InfinitePay.
- Confirmação do pagamento por webhook.
- Registro automático de clientes pagantes no Supabase.
- Página de sucesso após a compra.
- Dashboard administrativo de inscritos.
- Contato rápido por WhatsApp.

## Fluxo da compra

```text
Escolha do plano
      ↓
Dados do participante
      ↓
Checkout InfinitePay
      ↓
Confirmação por webhook
      ↓
Registro no Supabase
      ↓
Página de sucesso
```

## Tecnologias

| Área | Tecnologias |
|---|---|
| Front-end | HTML5, CSS3 e JavaScript |
| Back-end | Node.js e Express |
| Banco de dados | Supabase |
| Pagamentos | InfinitePay API |
| Hospedagem | Vercel e Render |

## Como executar

### Pré-requisitos

- Node.js e npm.
- Projeto no Supabase.
- Conta e handle configurados na InfinitePay.

### Back-end

```bash
git clone https://github.com/PedroAugusto-PAVS/SKINBEAUTY.git
cd SKINBEAUTY/back
npm install
npm start
```

### Front-end

Sirva a pasta `public/` com um servidor estático:

```bash
cd SKINBEAUTY
npx serve public
```

## Variáveis de ambiente

Crie `back/.env` apenas no ambiente local ou na plataforma de hospedagem:

```env
PORT=3000
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_KEY=SUA_CHAVE_PRIVADA_DO_BACKEND
INFINITE_HANDLE=SEU_HANDLE_INFINITEPAY
ADMIN_PASSWORD=UMA_SENHA_FORTE
```

### Cuidados importantes

- Nunca envie `.env` para o GitHub.
- A chave privilegiada do Supabase deve existir apenas no back-end.
- Valide a autenticidade dos webhooks antes de confiar nos dados recebidos.
- Use HTTPS em produção.
- Armazene segredos nas variáveis protegidas da hospedagem.
- Restrinja e audite o acesso ao dashboard administrativo.

## Estrutura do projeto

```text
.
├── back/
│   ├── routes/          # pagamento, webhook e administração
│   ├── server.js        # servidor Express
│   ├── supabase.js      # integração com o banco
│   └── package.json
├── public/
│   ├── css/             # estilos
│   ├── js/              # scripts da interface
│   ├── img/             # imagens
│   ├── index.html       # landing page
│   ├── success.html     # confirmação da compra
│   └── admin.html       # painel administrativo
├── LICENSE
└── README.md
```

## Deploy

### Front-end — Vercel

Publique a pasta `public/` e configure a URL pública do back-end usada pelo navegador.

### Back-end — Render

Configure o diretório `back/`, os comandos de instalação e inicialização e todas as variáveis de ambiente. Cadastre no provedor de pagamento a URL pública correta do webhook.

## Licença

Distribuído sob a licença MIT. Consulte [LICENSE](./LICENSE).

## Autor

Desenvolvido por [Pedro Augusto](https://github.com/PedroAugusto-PAVS).
