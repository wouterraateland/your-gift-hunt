export const firebase = {
  apiKey: "AIzaSyAhWunr36e-i7Xmtrm6L5LyLSlaGNyOYv8",
  authDomain: "your-gift-hunt.firebaseapp.com",
  databaseURL: "https://your-gift-hunt.firebaseio.com",
  projectId: "your-gift-hunt",
  storageBucket: "your-gift-hunt.appspot.com",
  messagingSenderId: "246235939258"
}

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false
}

export default { firebase, rrfConfig }
