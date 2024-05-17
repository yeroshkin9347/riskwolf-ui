#!/usr/bin/env sh
set -eu

envsubst '${CONFIG_FILE}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"