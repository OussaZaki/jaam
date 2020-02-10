#!/bin/bash

# Create a .env file from environment variables
echo SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID >> .env
echo SPOTIFY_CLIENT_SECRET=$SPOTIFY_CLIENT_SECRET >> .env
echo SPOTIFY_REDIRECT_URI=$SPOTIFY_REDIRECT_URI >> .env

