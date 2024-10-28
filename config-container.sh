#!/bin/bash

# Atualizar pacotes e instalar atualizações disponíveis
echo "Atualizando pacotes do sistema..."
sudo apt-get update && sudo apt-get upgrade -y

# Verificar se o Docker está instalado, caso contrário, instalar docker.io
if ! command -v docker &> /dev/null
then
    echo "Docker não está instalado. Instalando docker.io..."
    sudo apt-get install -y docker.io
else
    echo "Docker já está instalado."
fi

# Criar uma rede interna chamada "minha-rede-interna" se não existir
if ! sudo docker network ls | grep -q "minha-rede-interna"; then
    echo "Criando rede Docker chamada 'minha-rede-interna'..."
    sudo docker network create minha-rede-interna
else
    echo "Rede 'minha-rede-interna' já existe."
fi

# Função para construir Dockerfile e rodar container
build_docker() {
    local directory=$1
    local container_name=$2

    echo "Entrando na pasta $directory..."
    cd "../$directory" || { echo "Pasta $directory não encontrada!"; exit 1; }

    echo "Construindo Dockerfile na pasta $directory..."
    sudo docker build -t "${directory,,}-image" .

    echo "Rodando container $container_name na rede 'minha-rede-interna'..."
    sudo docker run -d --name "$container_name" --network minha-rede-interna "${directory,,}-image"

    echo "Voltando ao diretório inicial..."
    cd - || exit 1
}

# Entrar na pasta BD e executar o Dockerfile
build_docker "BD" "banco-container"

# Entrar na pasta JAVA e executar o Dockerfile
build_docker "JAVA" "java-container"

# Entrar na pasta SITE e executar o Dockerfile
build_docker "SITE" "site-container"

echo "Execução do script concluída."