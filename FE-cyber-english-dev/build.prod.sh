#!/bin/bash
VER='NONE'
echo "build FE cyber-english..."


destdir=./version

while IFS= read -r line
do VER="$line"
done < "$destdir"

if [ $VER == "NONE" ]; then
    read -p "enter version:    " VER
else
    STEP=0.1
    VER=`echo $VER + $STEP | bc`
fi

echo "building image xaythixin/images:english.prod.fe.$VER"

docker image build --no-cache -t xaythixin/images:english.prod.fe.$VER -t xaythixin/images:english.prod.fe.latest -f docker/DockerFile.prod .

read -p "do you want to push image to docker hub [ y/n ]:   " IS_PUSH

if [ $IS_PUSH == "y" ]; then
    docker image push xaythixin/images:english.prod.fe.$VER
    docker image push xaythixin/images:english.prod.fe.latest
fi

echo "$VER" >> "$destdir"

read -p "finish..." no
