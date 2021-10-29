#!/bin/bash

# Making folders for uploads
echo "$(tput setaf 100)Making folders to store videos and thumbnails"
echo "--------------------------------------------"
if [ ! -d ../data/uploads ] || [ ! -d ../data/uploads/thumbnails ]
then
  echo "Creating 'upload' folder"
  mkdir -p ./data/uploads;

  echo "Creating 'thumbnails' folder"
  mkdir -p ./data/uploads/thumbnails;
fi
echo ""


# Delete old videos and thumbnails
echo "$(tput setaf 125)cleaning uploaded files"
echo "--------------------------------------------"
echo "Deleting old videos"
rm ./data/uploads/*mp4

echo "Deleting old videos thumnail"
rm ./data/uploads/thumbnails/*png
rm ./data/uploads/thumbnails/*jpg
rm ./data/uploads/thumbnails/*jpeg

echo "Deleting old profile pictures"
rm ./data/uploads/*png
rm ./data/uploads/*jpg
echo ""


