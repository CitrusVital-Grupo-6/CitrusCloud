# Usar uma imagem base do Java (JDK)
FROM openjdk:22-ea-17-slim

# Instalar as atualizações
RUN apt-get update && apt-get install -y

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo .jar para o container
COPY ./javaCitrus/target/javaCitrus-1.0-SNAPSHOT-jar-with-dependencies.jar /app/app.jar

# Definir um comando padrão para executar o arquivo .jar e carregar as variáveis do .env
ENTRYPOINT ["java", "-jar", "/app/app.jar"]