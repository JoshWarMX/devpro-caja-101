import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, updateProfile, EmailAuthProvider,
  reauthenticateWithCredential, updateEmail, updatePassword, getIdToken
}
  from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, query, where, limit, orderBy, updateDoc, increment, doc, setDoc  } from "firebase/firestore";

import { fileToBlob } from "../utils/helper";
import firebase from "./firebase";

export const actGetCurrentUser = () => {
  console.log("actGetCurrentUser")
  const auth = getAuth()
  const user = auth.currentUser
  return user
}

export const actCloseSession = () => {
  console.log("actCloseSession")
  return getAuth().signOut();
}

export const actRegisterUser = async (email, password) => {
  const result = { statusResponse: false, error: null };
  const auth = getAuth();
  console.log("actRegisterUser")
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
  console.log("actLodinWithEmailAndPassword")
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
  console.log("actUploadImage")
  try {
    await
      uploadBytes(storageRef, blob).then((snapshot) => {
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
  console.log("actUpdateProfile")
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
  console.log("actReAuthenticate")
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
  console.log("actUpdateEmail")
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
  console.log("actUpdatePassword")
  try {
    await updatePassword(auth.currentUser, password)
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
  return result
}

export const actAddDocumentWithOuthId = async (collectionBase, data) => {
  const result = { statusResponse: true, error: null }
  console.log("actAddDocumentWithOuthId")
  try { 
    const docRef = await addDoc(collection(firebase.db, collectionBase), data);
    await actUpdateId(collectionBase, docRef.id)
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
  return result
}

export const actGetProducts = async (limitProducts) => {
  const result = { statusResponse: true, error: null, products: [], startProduct: null }
  const q = query(collection(firebase.db, "products"), orderBy("updatedAt", "desc"), limit(limitProducts))
  console.log("actGetProducts")
  try {
    const response = await getDocs(q)
    if (response.docs.length > 0) {
      result.startProduct = response.docs[response.docs.length - 1]
    }
    response.forEach((doc) => {
      const product = doc.data()
      result.products.push(product)
    })
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
  return result
}

export const actGetEnterOrders = async (limitOrders) => {
  const result = { statusResponse: true, error: null, orders: [], startOrder: null }
  const q = query(collection(firebase.db, "enterMerchaOrders"), orderBy("createdAt", "desc"), limit(limitOrders))
  console.log("actGetEnterOrders")
  try {
    const response = await getDocs(q)
    if (response.docs.length > 0) {
      result.startOrder = response.docs[response.docs.length - 1]
    }
    response.forEach((doc) => {
      const order = doc.data()      
      result.orders.push(order)
    })
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
  return result
}

export const actFindProductby = async (type, name) => {
  const result = { statusResponse: false, error: null, product: null }
  const q = query(collection(firebase.db, "products"), where(type, "==", name))
  console.log("actFindProductby")
  try {
    const response = await getDocs(q)    
    if (response.docs.length > 0) {
      result.statusResponse = true
    } else {
      result.statusResponse = false
    }
    response.forEach((doc) => {
      result.product = doc.data()
    })
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
  return result
}

export const actUpdateId = async (collectionBase, docId) => {
  const result = { statusResponse: true, error: null }
  const ref = doc(collection(firebase.db, collectionBase), docId)
  console.log("actUpdateStock")
  try {
    await updateDoc(ref, {
      productId: docId    
    })
    result.statusResponse = true
  } catch (error) {
    result.statusResponse = false
    result.error = error
    console.log(error)
  }
  return result
}

export const actUpdateStock = async (productId, quantity) => {
  const result = { statusResponse: true, error: null }
  const ref = doc(collection(firebase.db, "products"), productId)
  console.log("actUpdateStock")
  try {
    await updateDoc(ref, {
      stock1: increment(quantity)      
    })
    result.statusResponse = true
  } catch (error) {
    result.statusResponse = false
    result.error = error
    console.log(error)
  }
  return result
}
