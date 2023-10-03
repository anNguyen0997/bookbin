import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuVn1jJr97nNSrgWGR9ZzH2RxO-8aSx3I",
  authDomain: "bookbin-616c5.firebaseapp.com",
  projectId: "bookbin-616c5",
  storageBucket: "bookbin-616c5.appspot.com",
  messagingSenderId: "802111371780",
  appId: "1:802111371780:web:5bb43198c41de017a21351"
};
  
  // initialize firebase
  const app = initializeApp(firebaseConfig)

  export const auth = getAuth(app)
  export const db = getFirestore(app)