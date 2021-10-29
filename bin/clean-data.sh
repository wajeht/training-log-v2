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


# Delete old videos and thumbnails
echo "$(tput setaf 125)cleaning uploaded files"
echo "--------------------------------------------"
echo "Deleting old videos"
rm ./data/upload/*mp4

echo "Deleting old videos thumnail"
rm ./data/upload/thumbnail/*png
rm ./data/upload/thumbnail/*jpg
rm ./data/upload/thumbnail/*jpeg

echo "Deleting old profile pictures"
rm ./data/upload/*png
rm ./data/upload/*jpg
echo ""


