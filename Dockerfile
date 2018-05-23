FROM quay.io/ukhomeofficedigital/nodejs-base:v8.9.4

RUN yum update -y -q \
 && yum clean -q all \
 && rm -rf /var/cache/yum \
 && rpm --rebuilddb --quiet

USER nodejs
WORKDIR /app
ENV NODE_ENV production

COPY *node_modules/ package.json /app/
RUN npm install --only production > .npm-install.log 2>&1 \
 && rm .npm-install.log \
 || ( EC=$?; cat .npm-install.log; exit $EC )

COPY mock/ /app/mock/
COPY entrypoint.sh /app/
COPY src/ /app/src/
COPY config.js /app/

RUN npm run postinstall

USER root
RUN chown -R nodejs:nodejs .

USER 999
CMD ["./entrypoint.sh"]
