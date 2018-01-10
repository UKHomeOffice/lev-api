DOCKER_IMAGE ?= lev-api

patch_version != jq -r '.version' 'package.json'
minor_version != echo "$(patch_version)" | awk -F '.' '{print $$1"."$$2}'

#test_image = quay.io/ukhomeofficedigital/lev-api-test:$(minor_version)
test_image = quay.io/ukhomeofficedigital/lev-api-test:latest
perf_test_image = quay.io/ukhomeofficedigital/artillery-ci:0.2
compose_network = levapi_default

probe_network = docker network ls | grep -q '$(compose_network)'

.PHONY: all clean deps distclean docker docker-compose docker-compose-clean docker-compose-deps docker-test docker-test-deps node-deps run test unit-test

all: deps test docker

clean: docker-compose-clean
	rm -rf node_modules/

distclean: clean
	docker rmi -f '$(DOCKER_IMAGE)' || true
	docker-compose down -v --rmi all

deps: docker-test-deps node-deps

docker-compose-deps:
	docker-compose pull

docker-test-deps: docker-compose-deps
	docker pull '$(test_image)'
	docker pull '$(perf_test_image)'

node-deps: node_modules/

node_modules/: package.json
	npm install

docker:
	docker build -t '$(DOCKER_IMAGE)' .

unit-test: node-deps
	npm test

docker-compose: docker-compose-deps docker docker-compose.yml
	docker-compose build

docker-test: docker-test-deps docker
	docker rm -vf 'lev-api-mock' || true
	docker run -d --name 'lev-api-mock' --env 'MOCK=true' '$(DOCKER_IMAGE)'
	docker run --net 'container:lev-api-mock' --env 'TEST_URL=http://localhost:8080' --env 'WAIT=true' '$(test_image)'
	docker stop 'lev-api-mock'
	docker-compose -f docker-compose-test.yml stop
	docker-compose -f docker-compose-test.yml rm -vfs
	docker-compose -f docker-compose-test.yml down -v
	docker-compose -f docker-compose-test.yml pull
	docker-compose -f docker-compose-test.yml build
	docker-compose -f docker-compose-test.yml up &> /dev/null &
	eval $(probe_network); \
	while [ $$? -ne 0 ]; do \
		echo ...; \
		sleep 5; \
		eval $(probe_network); \
	done; true
	docker run --net 'levapi_default' --env 'TEST_URL=http://api:8080' --env 'WAIT=true' '$(test_image)'
	docker run --net 'levapi_default' --env "TEST_CONFIG=$$(cat ./test/perf/artillery.config.yml)" --env "MEDIAN_LATENCY=50" '$(perf_test_image)'
	docker-compose -f docker-compose-test.yml down -v

docker-compose-clean:
	docker-compose stop
	docker-compose rm -vf

run: docker-compose-clean docker-compose
	docker-compose up

test: unit-test docker-test
