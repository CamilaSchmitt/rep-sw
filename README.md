# API para Relógio Eletrônico de Ponto – Microsserviços

## Tecnologias Utilizadas
- Node.js – Ambiente de execução backend
- Express – Framework para construção das APIs
- PostgreSQL – Banco de dados relacional
- TypeORM – ORM para abstração do banco de dados
- Axios – Comunicação entre microsserviços
- JWT – Autenticação baseada em tokens
- Dotenv – Gerenciamento de variáveis de ambiente
- Postman – Testes de API

## Instalação e Configuração
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados no arquivo .env:
```bash
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=rep-sw-db / jornda-service-db / departamento-service-db
DB_PORT=5432

API_PORT=3002

TOKEN_KEY=ChaveSecreta
MASTER_PASSWORD=SenhaSecreta
```

4. Inicie o servidor:
```bash
npm run dev
```

## Documentação
1. Inicie os servidores localmente:
```bash
npm run dev
```
2. Acesse a documentação em: 
API Principal - `http://localhost:3002/docs`
API Jornada - `http://localhost:3003/docs`
API Departamento - `http://localhost:3004/docs`





