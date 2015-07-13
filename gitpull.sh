#!/usr/bin/env bash

cd /www/CantangoHome
git pull git@github.com:vberbenetz/CantangoHome.git
pm2 restart server