#!/bin/bash

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


