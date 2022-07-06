import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, updateProfile, EmailAuthProvider,
  reauthenticateWithCredential, updateEmail, updatePassword 
}
  from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import 'firebase/storage';
import { fileToBlob } from "../utils/helper";
import firebase from "./firebase";
import 'firebase/compat/firestore';

export const actIsUserLogged = () => {
  const auth = getAuth();
  let isLogged = false;
  onAuthStateChanged(auth, (user) => {
    user !== null && (isLogged = true);
  });
  console.log("isUserLogged", isLogged);
  return isLogged;
}

export const actGetCurrentUser = () => {
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

export const actCloseSession = () => {
  return getAuth().signOut();
}

export const actRegisterUser = async (email, password) => {
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

export const actLodinWithEmailAndPassword = async (email, password) => {
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

export const actUploadImage = async (image, path, name) => {
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

export const actUpdateProfile = async (data) => {
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


export const actReAuthenticate = async (password) => {
  const auth = getAuth();
  const result = { statusResponse: true, error: null }
  const user = actGetCurrentUser()
  const credential = EmailAuthProvider.credential(user.email, password);
  try {
    await reauthenticateWithCredential(auth.currentUser, credential)    
  } catch (error) {
    result.statusResponse = false
    result.error = error    
  }
  return result  
}

export const actUpdateEmail = async (email) => {
  const auth = getAuth();
  const result = { statusResponse: true, error: null }
  try {
    await updateEmail(auth.currentUser, email)
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
  return result
}

export const actUpdatePassword = async (password) => {
  const auth = getAuth();
  const result = { statusResponse: true, error: null }
  try {
    await updatePassword(auth.currentUser, password)
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
  return result
}





