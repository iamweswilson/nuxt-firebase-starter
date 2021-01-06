# nuxt firebase starter

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Set up with your Firebase account

1. Log in or set up an account at [https://firebase.google.com/](https://firebase.google.com/).
2. "Create a Project" through the console.
3. Go to "Project Settings" and select "Web" under "Your apps".
4. Name and create a new web app
5. Copy the config details provided for your firebase app and paste them in `/plugins/firebase.js`
6. In the Firebase console, turn on "Authentication" (select "Email/Password"), Firestore, and Storage.

## Netlify deploy configuration

- Build command: `yarn generate`
- Publish directory: `dist`
(These are defined in `netlify.toml`)
