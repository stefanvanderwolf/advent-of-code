#!/bin/sh

jq --raw-output \
  '.scripts | keys | map(select(test("^[0-9]+$"))) | map(tonumber) | max | tostring' \
  < package.json
