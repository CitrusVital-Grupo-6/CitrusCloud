# Usar uma imagem base do Java (JDK)
FROM openjdk:22-ea-17-slim

# Instalar o bash para rodar scripts
RUN apt-get update && apt-get install -y bash

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo .env para o container
COPY ./.env /app/.env

# Copiar o arquivo .jar para o container
COPY ./javaCitrus/target/javaCitrus-1.0-SNAPSHOT-jar-with-dependencies.jar /app/app.jar

# Definir um comando padrão para executar o arquivo .jar e carregar as variáveis do .env
ENTRYPOINT ["bash", "-c", "source /app/.env && java -jar /app/app.jar"]

# Executar um comando no terminal assim que o JAR rodar
CMD ["bash"]