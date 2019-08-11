# sandbox-website
Web app using React and Firebase.

## Get started
* Create a project in Firebase console: https://console.firebase.google.com/
* Enable Firebase Authentication with email/password sign-in provider & Firebase Realtime Database for the project. 
* `yarn`
* `mv src/controllers/firebase/temp-config.js src/controllers/firebase/config.js`
* Update `src/controllers/firebase/config.js` with your Firebase configuration. You can get this configuration somewhere in the Firebase console if you try to add Firebase to web app. 
* `yarn start`

> Note that you can have two Firebase projects - one for a Production environment and one for a Development environment. Their configuration can be used in `src/firebase/config.js`.

## Development
* `yarn start`

## Deployment
* `yarn build`
* `firebase login`
* `firebase deploy`