# Vybe - Rede Social

Vybe é uma rede social moderna construída com a stack MERN, inspirada em funcionalidades populares de plataformas como Instagram. O projeto possui duas pastas principais: `frontend` e `backend`.

🔗 **Link do projeto:** [https://vybe-gbn4.onrender.com](https://vybe-gbn4.onrender.com)  
📁 **Repositório:** [https://github.com/diegovilhalva/vybe](https://github.com/diegovilhalva/vybe)

---

## 🧰 Tecnologias utilizadas

- **MongoDB** – Banco de dados NoSQL
- **Express.js** – Framework para Node.js
- **React** – Biblioteca para construção da interface
- **Node.js** – Ambiente de execução JavaScript no backend
- **TailwindCSS** – Estilização rápida e responsiva
- **Socket.IO** – Comunicação em tempo real (chat)
- **Cloudinary** – Armazenamento de mídia (imagens e vídeos)

---

## ✨ Funcionalidades

- ✅ Registro e login de usuários
- 🔐 Recuperação de senha via e-mail
- 📝 Criação de posts com imagem ou vídeo
- 🔁 Criação de loops (semelhante ao Reels)
- 📸 Criação de stories
- 💬 Comentários em posts e loops
- ❤️ Likes em posts e loops
- 👥 Seguir e deixar de seguir usuários
- 🔍 Pesquisa por usuários
- 📩 Mensagens diretas em tempo real (chat com socket.io)
- 🔔 Notificações de interações

---

## 📁 Estrutura do Projeto

```

vybe/
├── backend/
│   └── ... (código do servidor, rotas, models, controllers)
├── frontend/
│   └── ... (interface React com TailwindCSS)

````

---

## 🔐 Variáveis de ambiente

### Backend (`backend/.env`)

```env
PORT=4000
MONGODB_URI=<sua-uri-do-mongo>
JWT_SECRET=<sua-chave-secreta>
ZOHO_EMAIL=<email para envio de recuperação>
ZOHO_PASSWORD=<senha do email>
CLOUDINARY_CLOUD_NAME=<nome do seu cloudinary>
CLOUDINARY_API_KEY=<api key do cloudinary>
CLOUDINARY_API_SECRET=<api secret do cloudinary>
CLIENT_ENDPOINT=http://localhost:5173
````

### Frontend (`frontend/.env`)

```env
VITE_URL_ENDPOINT=http://localhost:4000
```

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/diegovilhalva/vybe
cd vybe
```

### 2. Instale as dependências

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Configure os arquivos `.env`

Crie arquivos `.env` nas pastas `frontend` e `backend` conforme indicado acima.

### 4. Inicie os servidores

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd ../frontend
npm run dev
```

---

## 📦 Deploy

* Backend: [Render](https://render.com)
* Frontend: Pode ser feito no Vercel, Netlify ou integrado ao próprio backend.

---

## 📌 Autor

Desenvolvido por [Diego Vilhalva](https://github.com/diegovilhalva)

