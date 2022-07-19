#!/bin/sh

TEST_FILE=$1

TEST_DIST_FILE=/tests/"${TEST_FILE}".js

docker compose run --rm -T k6 run --compatibility-mode=base "${TEST_DIST_FILE}"