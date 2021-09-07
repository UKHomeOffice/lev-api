FROM node:12.22.1-alpine

RUN apk add --no-cache \
      ca-certificates \
      g++ \
      make \
      python \
 && apk upgrade --no-cache \
 && addgroup -S app \
 && adduser -S app -G app -u 31337 -h /app/ \
 && chown -R app:app /app/

USER app
WORKDIR /app
ENV NODE_ENV production

COPY *node_modules/ package.json .snyk /app/
RUN npm install --only production > .npm-install.log 2>&1 \
 && rm .npm-install.log \
 || ( EC=$?; cat .npm-install.log; exit $EC )

COPY mock/ /app/mock/
COPY src/ /app/src/
COPY config.js /app/

RUN npm run postinstall

USER root
RUN apk del --no-cache \
      g++ \
      make \
      python

USER 31337
ENV LISTEN_HOST="0.0.0.0" \
    LISTEN_PORT="8080" \
    POSTGRES_HOST="localhost" \
    POSTGRES_PORT="5432" \
    POSTGRES_DB="lev"
CMD ["node", "."]
