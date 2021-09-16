#!/usr/bin/env sh
set -eo pipefail

sed -i "s/PORT/${PORT}/g;" /etc/nginx/conf.d/default.conf

nginx -t

if [ -z ${DEBUG+x} ]; then
    nginx -g "daemon off;"
else
    nginx-debug -g "daemon off;"
fi
