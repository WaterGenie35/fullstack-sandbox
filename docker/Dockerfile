# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.12.1

FROM node:${NODE_VERSION}-alpine as base
    WORKDIR /usr/src/app
    EXPOSE 3000

# TODO: check migration workflow; separate it from the default?
# USER root
# COPY docker/entrypoint.sh .
# RUN chmod +x ./entrypoint.sh

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.

# https://docs.docker.com/language/nodejs/develop/#configure-and-run-a-development-container
FROM base as dev
    RUN --mount=type=bind,source=package.json,target=package.json \
        --mount=type=bind,source=package-lock.json,target=package-lock.json \
        --mount=type=cache,target=/root/.npm \
        npm ci --include=dev
    USER node
    COPY . .
    CMD npm run app-dev

FROM base as prod
    RUN --mount=type=bind,source=package.json,target=package.json \
        --mount=type=bind,source=package-lock.json,target=package-lock.json \
        --mount=type=cache,target=/root/.npm \
        npm ci --omit=dev
    USER node
    COPY . .
    CMD npm run app
