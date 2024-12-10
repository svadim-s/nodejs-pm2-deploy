#!/bin/bash
SSH_CONFIG="${1}"
PROJECT_PATH="${2}"
DEPLOY_PRIVATE_KEY="${3}"
scp -Cr -i $DEPLOY_PRIVATE_KEY .env "$SSH_CONFIG:${PROJECT_PATH}/current/backend"
