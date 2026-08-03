# CRUD with Database (Node.js)

This repository contains a simple Node.js API that performs CRUD operations (Create, Read, Update, Delete) using MySQL as the database. Postman was used as the API client to test the endpoints and make request examples easier to import.

## Technologies

- Node.js
- MySQL
- Postman (API client)

## Prerequisites

- Node.js (>= 16)
- npm or yarn
- MySQL

## Environment variables

Update the values in the connection file according to your database configuration (connection.js).

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=your_password
- DB_NAME=your_database_name
- PORT=3306

## Installation

1. Run: `npm install`
2. Create a `.env` file with the `SECRET_KEY` variable
3. Start the application:
   - `npm start`
   - or in development mode: `npm run dev`

## Authentication

- `POST /login` — authenticate a user and receive a JWT token
  - JSON body: `{ "nameUser", "passwordUser" }`

## Token usage

All authenticated requests must send the following header:

- `Authorization: Bearer <token>`

## User routes

- `GET /users` — list all users
- `GET /user/:id` — get a user by ID
- `PUT /user/:id` — update a user
- `POST /user` — create a new user
  - JSON body: `{ "nameUser", "passwordUser" }`
- `DELETE /user/:id` — remove a user

## Client routes

These routes are protected and require authentication.

- `GET /clients` — list all clients (PROTECTED)
- `GET /clients/:id` — get a client by ID (PROTECTED)
- `POST /clients` — create a client (PROTECTED)
  - JSON body: `{ "nameClient", "contact", "proceidure": "deadline", "price" }`
- `PUT /clients/:id` — update a client (PROTECTED)
- `DELETE /clients/:id` — remove a client (PROTECTED)

## Using Postman

1. Create a collection (for example: Crud-API).
2. Create environment variables in Postman:
   - `baseUrl = http://localhost:3000`
3. Example request:
   - `GET {{baseUrl}}/clients`

## Useful scripts

- `npm start` — starts the server
- `npm run dev` — starts the app in development mode (if available)

#

#

# CRUD com Banco de Dados (Node.js) - Versão em Pt-Br

Este repositório contém uma API Node.js simples que realiza operações CRUD (Create, Read, Update, Delete) usando MySQL como banco de dados. O Postman foi utilizado como cliente para testar os endpoints e facilitar a importação de exemplos.

## Tecnologias

- Node.js
- MySQL
- Postman (cliente API)

## Pré-requisitos

- Node.js (>= 16)
- npm ou yarn
- MySQL

Variáveis de ambiente (arquivo connection.js, alterar de acordo com seus dados)

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=senha
- DB_NAME=nome_do_banco
- PORT=3306

## Instalação

1. Rode `npm install`
2. Criar arquivo `.env` com a variável `SECRET_KEY`
3. Executar a aplicação:
   - `npm start`
   - ou em desenvolvimento: `npm run dev`

## Autenticação

- POST /login — autenticar usuário e receber token (JWT)
  - Body (JSON): { "nameUser", "passwordUser" }

## Uso do token

- Todas as requisições autenticadas devem enviar o header:
- `Authorization: Bearer <token>`

## Rotas de usuários (User)

- `GET /users` — lista todos os usuários
- `GET /user/:id` — obter usuário por id
- `PUT /user/:id` — atualizar usuário
- `POST /user`— criar novo usuário
  - Body (JSON): `{ "nameUser", "passwordUser" }`
- `DELETE /user/:id` — remover usuário

## Rotas de clientes (Clients) — protegidas (requer autenticação)

- `GET /clients` — lista todos os clientes (PROTECTED)
- `GET /clients/:id` — obter cliente por id (PROTECTED)
- `POST /clients` — criar cliente (PROTECTED)
  - Body (JSON): `{ "nameClient", "contact", "proceidure": "deadline", "price" }`
- `PUT /clients/:id` — atualizar cliente (PROTECTED)
- `DELETE /clients/:id` — remover cliente (PROTECTED)

## Uso do Postman

1. Criar uma Collection (ex.: Crud-API).
2. Criar variáveis de ambiente no Postman:
   - `baseUrl = http://localhost:3000`
3. Exemplos de requisição:
   - `GET {{baseUrl}}/clients`

## Scripts úteis (package.json)

- `npm start` — inicia o servidor
- `npm run dev` — inicia em modo desenvolvimento (se disponível)

## Author / Autor

- Jaqueline Bravin Ramos
