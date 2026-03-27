# Usa uma imagem leve do Linux com Node.js instalado
FROM node:18-slim

# Instala o Java, necessário para rodar o MARS
# O comando apt-get update e install roda na construção do container
RUN apt-get update && \
    apt-get install -y default-jre && \
    rm -rf /var/lib/apt/lists/*

# Define a pasta de trabalho
WORKDIR /app

# Copia todos os arquivos do projeto para dentro do container
COPY . .

# Instala as dependências do Node (Express)
RUN npm install

# Expõe a porta 8000
EXPOSE 8000

# Comando para iniciar o middleware
CMD ["node", "middleware.js"]
