#!/bin/bash
# WARNING! this script removes files
for FILENAME in $(find . -type f -name "*.js" -not -path "./node_modules/*" -not -path "./public/*" -print | sed 's/^\.\///')
do
  JUSTNAME=$(echo `basename $FILENAME` | sed -e 's/\..*//')
  js2coffee $FILENAME > `dirname $FILENAME`/${JUSTNAME}.coffee
  rm $FILENAME
  echo "file $FILENAME converted to CoffeeScript and the original .js removed"
done
