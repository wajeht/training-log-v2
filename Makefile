all: dropdb createdb

dropdb:
	dropdb -U node_user traininglog;

createdb:
	createdb -U node_user traininglog;

build:
	docker build -t training-log-v2-web .
