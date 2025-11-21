import { db } from "./data.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productosColeccion = collection(db, "products");

//obtener todos los productos

export async function getAllProducts() {
  const productosSnapshot = await getDocs(productosColeccion);

  return productosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

//obtener producto por id
export async function getProductById(id) {
  const productDoc = await getDoc(doc(productosColeccion, id));
  if (!productDoc.exists()) return null;
  return { id: productDoc.id, ...productDoc.data() };
}

export async function deleteProductById(id) {
  await deleteDoc(doc(productosColeccion, id));
}

export async function saveProduct(productos) {
  await addDoc(productosColeccion, productos);
}
