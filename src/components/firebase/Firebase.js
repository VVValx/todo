import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBybf5HKSpJYNxjeUdS1YRwrmVkpLVUQOg",
  authDomain: "todo-44715.firebaseapp.com",
  databaseURL: "https://todo-44715.firebaseio.com",
  projectId: "todo-44715",
  storageBucket: "todo-44715.appspot.com",
  messagingSenderId: "816098182723",
  appId: "1:816098182723:web:791cceb51c4069d357b6f6",
  measurementId: "G-KGRRQ2CC5J",
};

export const createUserProfile = async (user, moreData) => {
  if (!user) return;

  const ref = db.doc(`users/${user.uid}`);

  const userData = await ref.get();

  if (!userData.exists) {
    const { displayName, email } = user;
    const dateCreated = new Date();
    try {
      await ref.set({ displayName, email, dateCreated, ...moreData });
    } catch (error) {}
  }

  return ref;
};

export const createUserProfileWithEmail = async (user, name) => {
  const ref = db.doc(`users/${user.uid}`);

  const userData = await ref.get();

  if (!userData.exists) {
    const dateCreated = new Date();
    try {
      await ref.set({ ...user, displayName: name, dateCreated });
    } catch (error) {}
  }

  return ref;
};

firebase.initializeApp(firebaseConfig);

export const authenticate = firebase.auth();
export const db = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;
