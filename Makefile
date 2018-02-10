DOCKER_IMAGE ?= lev-api

patch_version != jq -r '.version' 'package.json'
minor_version != echo "$(patch_version)" | awk -F '.' '{print $$1"."$$2}'

#test_image = quay.io/ukhomeofficedigital/lev-api-test:$(minor_version)
test_image = quay.io/ukhomeofficedigital/lev-api-test:latest
probe_api = curl -fs localhost/readiness &> /dev/null

.PHONY: all clean deps docker docker-compose docker-compose-clean docker-compose-deps docker-test docker-test-deps node-deps run test unit-test

all: deps test docker

clean: docker-clean
	rm -rf .build/

deps: docker-test-deps node-deps

docker-compose-deps:
	docker-compose pull

docker-test-deps: docker-compose-deps
	docker pull "$(test_image)"

node-deps: node_modules/

node_modules/: package.json
	npm install

build/:
	mkdir -p build/

docker:
	docker build -t 'lev-api' .

unit-test: node-deps
	npm test

docker-compose: docker-compose-deps docker
	docker-compose build

docker-test: docker-test-deps docker-compose-clean docker-compose
	docker-compose up &> /dev/null &
	eval $(probe_api); \
	while [ $$? -ne 0 ]; do \
		echo ...; \
		sleep 5; \
		eval $(probe_api); \
	done; true
	docker run --net host "$(test_image)"
	docker-compose stop

docker-compose-clean:
	docker-compose stop
	docker-compose rm -vf

run: docker-compose-clean docker-compose
	docker-compose up

test: unit-test docker-test
