import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJg01xcglappE2YjLzMID7ipzwwvHiMBg",
    authDomain: "fir-tutorial-4db44.firebaseapp.com",
    projectId: "fir-tutorial-4db44",
    storageBucket: "fir-tutorial-4db44.appspot.com",
    messagingSenderId: "443150693541",
    appId: "1:443150693541:web:35740717bc271ebab2c94c"
  };
  
  // initialize firebase
  const app = initializeApp(firebaseConfig)
  
  export const db = getFirestore(app)