import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/storage';
import { fileToBlob } from "../utils/helper";
import firebase from "./firebase";
import 'firebase/compat/firestore';

export const isUserLogged = () => {
  const auth = getAuth();
  let isLogged = false;
  onAuthStateChanged(auth, (user) => {
    user !== null && (isLogged = true);
  });
  console.log("isUserLogged", isLogged);
  return isLogged;
}

export const getCurrentUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  // if (user) {
  //   console.log("User is logged in");
  // } else {
  //   console.log("User is not logged in");
  // }
  //console.log("getCurrentUser get", user);
  return user;
}

export const closeSessionFire = () => {
  return getAuth().signOut();
}

export const registerUserFire = async (email, password) => {
  const result = { statusResponse: false, error: null };
  const auth = getAuth();
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    result.statusResponse = true;
  } catch (error) {
    result.error = "El Usuario ya existe";
  }
  return result
}

export const lodinWithEmailAndPassword = async (email, password) => {
  const result = { statusResponse: false, error: null };
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password)
    result.statusResponse = true;
  } catch (error) {
    result.error = "Usuario o Contraseña incorrecto";
  }
  return result
}

export const uploadImage = async (image, path, name) => {
  const result = { statusResponse: false, error: null, url: null }
  const blob = await fileToBlob(image)
  const storage = getStorage();
  const storageRef = ref(storage, (`${path}/${name}`));

  try {
    await
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    const url = await getDownloadURL(storageRef)
    console.log(url)
    result.statusResponse = true
    result.url = url
  } catch (error) {
    result.error = error
    console.log("XXX", error)
  }
  return result
}

export const updateProfile1 = async (data) => {
  const auth = getAuth();
  const result = { statusResponse: true, error: null }
  try {
    await updateProfile(auth.currentUser, data)     
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
    return result 
}


export const updateProfile2 = async (data) => {
  const result = { statusResponse: false, error: null }
  try {
    await firebase.auth().currentUser.updateProfile(data)
  } catch (error) {
    result.statusResponse = false
    result.error = error
    console.log("first", error)
  }
  return result
}






