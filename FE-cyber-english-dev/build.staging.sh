#!/bin/bash

echo "build FE cyber-english..."
read -p "enter version:    " VER

docker image build --no-cache -t xaythixin/images:english.staging.fe.$VER -t xaythixin/images:english.staging.fe.latest -f docker/DockerFile.staging .

read -p "do you want to push image to docker hub [ y/n ]:   " IS_PUSH

if [ $IS_PUSH == "y" ]; then
    docker image push xaythixin/images:english.staging.fe.$VER
    docker image push xaythixin/images:english.staging.fe.latest
fi

read -p "finish..." no
