# syntax=docker/dockerfile:1
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

#Set environment variables.
ARG UUID_TOKEN
ARG INSTANCE
ARG BEEHIIV_PUB_ID
ARG BEEHIIV_API_KEY
ARG GUMROAD_TOKEN
ARG MONGO_URL
ARG MEDIUM_URL
ENV NODE_ENV ${INSTANCE}
ENV BEEHIIV_PUB_ID ${BEEHIIV_PUB_ID}
ENV BEEHIIV_API_KEY ${BEEHIIV_API_KEY}
ENV GUMROAD_TOKEN ${GUMROAD_TOKEN}
ENV MONGO_URL ${MONGO_URL}
ENV MEDIUM_URL ${MEDIUM_URL}
ENV UUID_TOKEN ${UUID_TOKEN}

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD node app.js