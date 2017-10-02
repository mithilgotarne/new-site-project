#!/bin/bash
PATH="$PATH:$(npm bin)"
set -x

#Angular build
ng build --prod

#Generate SW manifest
# ./node_modules/.bin/ngu-sw-manifest --module src/app/app.module.ts \
./node_modules/.bin/ngu-sw-manifest --out dist/ngsw-manifest.json


#service worker file
cp node_modules/@angular/service-worker/bundles/worker-basic.min.js dist/

#run server
firebase serve

