# API para um Relógio Eletrônico de Ponto 

## Descrição
Este repositório apresenta o trabalho desenvolvido para a disciplina de Serviços Web (SW), com o objetivo de projetar, implementar e documentar uma API RESTful.

A proposta do projeto é o desenvolvimento de uma API para um sistema de Relógio Eletrônico de Ponto (REP), permitindo a gestão eficiente de usuários, departamentos e jornadas de trabalho. A aplicação oferece funcionalidades completas de CRUD (Create, Read, Update, Delete) para essas entidades, contribuindo para a automação e organização do controle de ponto.

## Tecnologias Utilizadas
- Node.js – Ambiente de execução JavaScript para o backend.
- Express – Framework para criação de APIs RESTful.
- PostgreSQL – Banco de dados relacional.
- TypeORM – ORM para facilitar o mapeamento entre objetos e tabelas.
- Posteman - Para testes.

## Instalação e Configuração
1. Clone o repositório:
``bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio `

2. Instale as dependências:
` ```bash
npm install`

3. Configure o banco de dados no arquivo .env:
` ```bash
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=rep-sw-db
DB_PORT=5432

API_PORT=3002

TOKEN_KEY=ChaveSecreta
MASTER_PASSWORD=SenhaSecreta`

4. Inicie o servidor:
` ```bash
npm run dev`

## Documentação
1. Inicie o servidor localmente:
2. Acesse a documentação em: http://localhost:3002/docs

## Endpoints da API
### Departamento
- `GET` /departamentos: Lista todos os departamentos. 
- `POST` /departamentos: Adiciona um novo departamento.
- `GET` /departamentos/{id}: Recupera um departamento pelo ID.
- `PUT` /departamentos/{id}: Atualiza um departamento pelo ID.
- `PATCH` /departamentos/{id}: Atualiza parcialmente um departamento pelo ID.
- `DEL` /departamentos/{id}: Deleta um departamento pelo ID.

### Jornada
- `GET` /jornadas: Lista todos os jornadas. 
- `POST` /jornadas: Adiciona um novo jornada.
- `GET` /jornadas/{id}: Recupera um jornada pelo ID.
- `PUT` /jornadas/{id}: Atualiza um jornada pelo ID.
- `PATCH` /jornadas/{id}: Atualiza parcialmente um jornada pelo ID.
- `DEL` /jornadas/{id}: Deleta um jornada pelo ID.

### Usuario
- `GET` /usuarios: Lista todos os usuarios. 
- `POST` /usuarios: Adiciona um novo usuario.
- `GET` /usuarios/{id}: Recupera um usuario pelo ID.
- `PUT` /usuarios/{id}: Atualiza um usuario pelo ID.
- `PATCH` /usuarios/{id}: Atualiza parcialmente um usuario pelo ID.
- `DEL` /usuarios/{id}: Deleta um usuario pelo ID.









