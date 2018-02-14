#!/bin/sh

if [ $AUDIENTI_ENV = "PRODUCTION" ]; then
  echo "Running production..."
  yarn && yarn build
elif [$AUDIENTI_ENV = "TEST" ]; then
  echo "ADD TEST command to your init script..."
else
  echo "Running development..."
  yarn && yarn start
fi
