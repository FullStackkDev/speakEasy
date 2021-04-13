export GOOGLE_APPLICATION_CREDENTIALS="service-account/dev.json"
firebase functions:config:get > .runtimeconfig.json
npm run serve