#!/usr/bin/env bash

set -eo pipefail

project_dir=$(
    cd $(dirname $0)
    pwd
)

app_name=$1
docker_latest_image_name="${app_name}:latest"

cd ${project_dir}
rm -rf ./dist

PUBLIC_PATH=/micro-frontend/test-cloud/ ./build.sh

docker build -t ${docker_latest_image_name} .
