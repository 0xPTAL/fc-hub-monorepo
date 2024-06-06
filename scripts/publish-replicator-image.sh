#!/bin/bash

# Builds and publishes Replicator image to Docker Hub.
# This is intended to be run by our GitHub Actions workflow.
#
# MUST be run from the root of the repository so the Docker build context is correct.
#
# You must `docker login ...` first so that we have the necessary permissions to
# push the image layers + tags to Docker Hub.

REPLICATOR_VERSION=$(node -e "console.log(require('./apps/replicator/package.json').version);")

echo "Publishing $REPLICATOR_VERSION"

depot build -f Dockerfile.replicator \
  --platform "linux/amd64,linux/arm64" \
  --push \
  -t 0xPTAL/replicator:${REPLICATOR_VERSION} \
  -t 0xPTAL/replicator:latest \
  .
