#!/usr/bin/env bash
set -eo pipefail

# Base
os_name="$(uname)"
upload_cdn=${1:-true}

app_name=micro-frontend-test-cloud
yarn_builder_image="codingcorp-docker.pkg.coding.net/registry/public/node-yarn:12.12.0"
cur_user="$(id -u):$(id -g)"
workspace_dir="/workspace"

build_src=$(pwd)

# Docker
docker_image_tag_name=$(git rev-parse HEAD)
docker_full_image_name="${app_name}:${docker_image_tag_name}"
docker_latest_image_name="${app_name}:latest"

REGISTRY_URL="${REGISTRY_URL:-codingcorp-docker.pkg.coding.net}"
REGISTRY_USER="${REGISTRY_USER:-xxx}"
REGISTRY_PASS="${REGISTRY_PASS:-xxx}"
IMAGE_BUILD_PREFIX="${IMAGE_BUILD_PREFIX:-codingcorp-docker.pkg.coding.net/registry/build}"

function status() {
    echo -e "\033[35m >>>   $*\033[0;39m"
}

function build() {
    echo "change build dir to: ${build_src}"

    # install packages and build
    if [ `uname` == "Darwin" ]; then
        echo "Building $app_name in Docker for macOS is buggy, we will build on local environment."

        yarn && \
        PUBLIC_PATH=${PUBLIC_PATH} \
        CDN_ENABLE=${CDN_ENABLE} \
        CDN_SECRET_ID=${CDN_SECRET_ID} \
        CDN_SECRET_KEY=${CDN_SECRET_KEY} \
        CDN_BUCKET=${CDN_BUCKET} \
        CDN_REGION=${CDN_REGION} \
        CDN_BASE_DIR=${CDN_BASE_DIR} \
        CDN_PROJECT_DIR=${CDN_PROJECT_DIR} \
        CDN_SKIP_DUPLICATE=${CDN_SKIP_DUPLICATE} \
        CDN_RETRY=${CDN_RETRY} \
        CDN_CACHE_CONTROL=${CDN_CACHE_CONTROL} \
        CMF_CONFIG_ENABLED=${CMF_CONFIG_ENABLED} \
        CMF_ROUTE_MATCH=${CMF_ROUTE_MATCH} \
        CMF_PRODUCT_NAME=${CMF_PRODUCT_NAME} \
        CMF_JS_PREFIX=${CMF_JS_PREFIX} \
        CMF_CSS_PREFIX=${CMF_CSS_PREFIX} \
        CMF_DEPLOY_MESSAGE=${CMF_DEPLOY_MESSAGE} \
        GIT_REVISION=${docker_image_tag_name} \
        OWNER=${OWNER} \
        API_HOST=${API_HOST} \
        PROJECT_WEB_URL=${PROJECT_WEB_URL} \
        JOB_ID=${JOB_ID} \
        CI_BUILD_NUMBER=${CI_BUILD_NUMBER} \
        DEBUG=axios \
        yarn build
        
    else
        echo "Building $app_name in docker environment."
        docker run --rm \
        -v ${build_src}:${workspace_dir} \
        -w ${workspace_dir} \
        -e PUBLIC_PATH=${PUBLIC_PATH} \
        -e CDN_ENABLE=${CDN_ENABLE} \
        -e CDN_SECRET_ID=${CDN_SECRET_ID} \
        -e CDN_SECRET_KEY=${CDN_SECRET_KEY} \
        -e CDN_BUCKET=${CDN_BUCKET} \
        -e CDN_REGION=${CDN_REGION} \
        -e CDN_BASE_DIR=${CDN_BASE_DIR} \
        -e CDN_PROJECT_DIR=${CDN_PROJECT_DIR} \
        -e CDN_SKIP_DUPLICATE=${CDN_SKIP_DUPLICATE} \
        -e CDN_RETRY=${CDN_RETRY} \
        -e CDN_CACHE_CONTROL=${CDN_CACHE_CONTROL} \
        -e CMF_CONFIG_ENABLED=${CMF_CONFIG_ENABLED} \
        -e CMF_ROUTE_MATCH=${CMF_ROUTE_MATCH} \
        -e CMF_PRODUCT_NAME=${CMF_PRODUCT_NAME} \
        -e CMF_JS_PREFIX=${CMF_JS_PREFIX} \
        -e CMF_CSS_PREFIX=${CMF_CSS_PREFIX} \
        -e CMF_DEPLOY_MESSAGE=${CMF_DEPLOY_MESSAGE} \
        -e GIT_REVISION=${docker_image_tag_name} \
        -e OWNER=${OWNER} \
        -e API_HOST=${API_HOST} \
        -e PROJECT_WEB_URL=${PROJECT_WEB_URL} \
        -e JOB_ID=${JOB_ID} \
        -e CI_BUILD_NUMBER=${CI_BUILD_NUMBER} \
        -e DEBUG=axios \
        ${yarn_builder_image} \
        bash -c "yarn install && yarn build && chown -R ${cur_user} ${workspace_dir}"
    fi
}

function create_volume_if_need() {
  if [ -z "`docker volume ls -q --filter name=${1}`" ]; then
      docker volume create --driver local --name ${1}
  fi
}

if ! grep -q ${REGISTRY_URL} ~/.docker/config.json; then
    status "logging into ${REGISTRY_URL}..."
    echo ${REGISTRY_PASS} | docker login -u ${REGISTRY_USER} --password-stdin ${REGISTRY_URL}
fi

case "${app_name}" in
    micro-frontend-test-cloud)
        build
      ;;
    *)
    echo "Unsupported app: ${app_name}"
esac