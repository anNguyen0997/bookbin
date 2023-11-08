import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../../../config/firebase';

const getUserData = async () => {
  const userReference = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(userReference);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export default getUserData;
