#!/usr/bin/env bash

set -eo pipefail

yarn --cache-folder .yarn-cache

env NODE_ENV=production yarn build
