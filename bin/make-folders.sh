#!/bin/bash

# Making folders for uploads
echo "$(tput setaf 100)Making folders to store videos and thumbnails"
echo "--------------------------------------------"
if [ ! -d ../data/upload ] || [ ! -d ../data/upload/thumbnail ]
then
  echo "Creating 'upload' folder"
  mkdir -p ./data/upload;

  echo "Creating 'thumbnails' folder"
  mkdir -p ./data/upload/thumbnail;
fi
echo ""
