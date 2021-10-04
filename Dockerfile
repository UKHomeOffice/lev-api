FROM node:12-alpine

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

COPY --chown=app:app *node_modules/ package.json .snyk /app/
RUN npm install --only production > .npm-install.log 2>&1 \
 && rm .npm-install.log \
 || ( EC=$?; cat .npm-install.log; exit $EC )

COPY --chown=app:app mock/ /app/mock/
COPY --chown=app:app src/ /app/src/
COPY --chown=app:app config.js rds-combined-ca-bundle.pem /app/

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
    POSTGRES_DB="lev" \
    NODE_EXTRA_CA_CERTS="/app/rds-combined-ca-bundle.pem"
CMD ["node", "."]
