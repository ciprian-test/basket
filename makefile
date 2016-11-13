.PHONY: test

.BIN_PATH := "./node_modules/.bin"

default: lint test

full: deps default

deps:
	npm install

lint:
	@$(.BIN_PATH)/eslint src/
	@$(.BIN_PATH)/eslint test/

test:
	@$(.BIN_PATH)/mocha -R spec test/*

start:
	@node src/index.js
