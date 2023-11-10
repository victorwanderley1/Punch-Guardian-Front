# Use uma imagem base do Node.js
FROM node:18.18.2 as build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração
COPY package*.json ./
COPY angular.json .
COPY tsconfig.json .

# Instale as dependências
RUN npm install

# Instale o Angular CLI globalmente
RUN npm install -g @angular/cli

# Copie todos os arquivos do projeto para o contêiner
COPY . .

# Construa o projeto Angular
RUN ng build

# Exponha a porta 4200
EXPOSE 4200

CMD ["ng", "serve"]
