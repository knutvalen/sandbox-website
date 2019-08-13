# sandbox-website
Web app with administrator section using React and Firebase.
* Authentication and authorization using Firebase Authentication and Firebase Realtime Database.
* Deployment using Firebase Hosting.

## Get started
* Create a project in Firebase console: https://console.firebase.google.com/
* Enable Firebase Authentication with email/password sign-in provider & Firebase Realtime Database for the project.
* `yarn`
* `mv src/controllers/firebase/temp-config.js src/controllers/firebase/config.js`
* Update `src/controllers/firebase/config.js` with your Firebase configuration. You can get this configuration somewhere in the Firebase console if you try to add Firebase to a web app. 
* `yarn start`
* Sign up at `http://localhost:3000/sign-up`
* Go to the Database section in the Firebase Console and edit your newly signed up user role from `user` to `admin`. 
* Now you should have access to the Admin page via the app menu at `http://localhost:3000/admin`
> Note that you can have two Firebase projects - one for a Production environment and one for a Development environment. Their configuration can be used in `src/firebase/config.js`.

## Development
* `yarn start`

## Deployment
* `firebase login`
> If you have not deployed the app earlier, log in to the Firebase CLI with `firebase login`. Then, setup Firebase Hosting with `firebase init` after `firebase login`. During initialization, when prompted `What do you want to use as your public directory?` select `build`. When prompted `Configure as a single-page app (rewrite all urls to /index.html)?` select `Yes`. And when prompted `File public/index.html already exists. Overwrite?` select `No`. 
* `yarn build`
* `firebase deploy`