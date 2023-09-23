#!/bin/bash

./bin/clean-data.sh

./bin/make-folders.sh

npm run cleandb

npm run start
