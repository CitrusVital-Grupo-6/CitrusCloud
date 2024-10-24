# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos do repositório dentro da pasta 'app' para o contêiner
COPY ./app/ ./

# Instala as dependências
RUN npm install

# Expõe a porta (ajuste conforme sua aplicação)
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "start"]