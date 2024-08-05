#!/usr/bin/env bash

# nvm is not available to startup daemon shell by default
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

npx codeclimbers start server
