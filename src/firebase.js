import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCM7Ei7p4iql5v-Kp6ZofjGVNnHG6_UGK8",
  authDomain: "login-react-redux-afc43.firebaseapp.com",
  databaseURL: "https://login-react-redux-afc43.firebaseio.com",
  projectId: "login-react-redux-afc43",
  storageBucket: "login-react-redux-afc43.appspot.com",
  messagingSenderId: "920006593729",
  appId: "1:920006593729:web:762de096eacb00414e1840"
}

firebase.initializeApp(firebaseConfig)

// Inicia sesión con google
export const loginWithGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider
  return (
    firebase.auth().signInWithPopup(provider)
    .then(snap => snap.user)
  )
}

// Cierra sesión
export const signOutGoogle = () => firebase.auth().signOut()

// Agregar db
let db = firebase.firestore().collection('favs')

export const updateDB = (array, uid) => {
  console.log(array, uid)
  return (
    db.doc(uid).set({
      favorites: [...array]
    })
  )
}

// Obtener favoritos
export const getFavs = uid => {
  return (
    db.doc(uid).get()
    .then(snap => {
      return snap.data().favorites
    })
  )
}