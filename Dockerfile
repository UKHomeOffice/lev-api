FROM quay.io/ukhomeofficedigital/nodejs-base:v8.9.4

RUN yum install -y -q nmap-ncat java-1.8.0-openjdk-headless \
 && yum update -y -q \
 && yum clean -q all \
 && rm -rf /var/cache/yum \
 && rpm --rebuilddb --quiet

USER nodejs
WORKDIR /app
ENV NODE_ENV production

ENV FLYWAY_VERSION 5.0.3
RUN curl https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/${FLYWAY_VERSION}/flyway-commandline-${FLYWAY_VERSION}.tar.gz | tar -xz \
 && mv flyway-${FLYWAY_VERSION}/ flyway/

COPY package.json /app/
RUN npm install --only production > .npm-install.log 2>&1 \
 && rm .npm-install.log \
 || ( EC=$?; cat .npm-install.log; exit $EC )

COPY sql/ /app/flyway/sql/
COPY entrypoint.sh /app/
COPY src/ /app/src/
COPY config.js /app/

COPY ./package.json /app/
RUN npm install --only production > .npm-install.log 2>&1 && rm .npm-install.log || ( EC=$?; cat .npm-install.log; exit $EC )

COPY . /app
RUN npm run postinstall

USER root
RUN yum update -y -q \
 && yum clean -q all \
 && rm -rf /var/cache/yum \
 && rpm --rebuilddb --quiet \
 && chown -R nodejs:nodejs .

USER nodejs
CMD ["./entrypoint.sh"]
