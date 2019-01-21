import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import firebaseConfig from '../config/firebase'

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

// if (firebase.auth().currentUser) {
//   f()
// } else {
//   firebase.auth().onAuthStateChanged(user => {
//     f()
//   })
// }
//
// firebase.auth().signInWithEmailAndPassword(
//   process.env.FIREBASE_EMAIL,
//   process.env.FIREBASE_PASSWORD
// )
