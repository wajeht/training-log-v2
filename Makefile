all: dropdb createdb

dropdb:
	dropdb -U username database;

createdb:
	createdb -U username database;

build:
	docker build -t training-log-v2-web .
