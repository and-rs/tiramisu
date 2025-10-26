#!/bin/sh

hurl --variables-file .env "$1" | jq
