# Etapa 1: Configuração inicial (build)
FROM node:18 AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos necessários para o container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir o projeto (caso você use TypeScript)
RUN npm run build

# Etapa 2: Imagem final (produção)
FROM node:18 AS production

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar apenas os arquivos necessários da etapa anterior
COPY package*.json ./
COPY --from=build /app/dist ./dist

# Instalar apenas as dependências de produção
RUN npm install --production

# Expõe a porta que a aplicação usará
EXPOSE 3003

# Comando para iniciar a aplicação
CMD ["node", "dist/server.js"]
