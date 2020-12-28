import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/storage'
import '@firebase/firestore'

function initFirebase () {
  firebase.initializeApp({ 
    apiKey: "AIzaSyA5Ch_EsfPzkrhoHZDsyOS6LXuI6cr4jJY",
    authDomain: "starter-template-6b25f.firebaseapp.com",
    projectId: "starter-template-6b25f",
    storageBucket: "starter-template-6b25f.appspot.com",
    messagingSenderId: "566841904066",
    appId: "1:566841904066:web:bccf7e46013ad3e81b245b",
    measurementId: "G-DKMW9M3JY8"
  })
  return new Promise((resolve, reject) => {
    firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

initFirebase()
  .catch(error => {
    // take user to a page stating an error occurred
    // (might be a connection error, or the app is open in another tab)
  })

export { firebase }
export const auth = firebase.auth()
