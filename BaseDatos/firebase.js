// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, doc, getDoc, setDoc, where } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrqYKgZDxN2o-lyXAc06Lcx1YXB2PQb5g",
  authDomain: "maratonformulario.firebaseapp.com",
  projectId: "maratonformulario",
  storageBucket: "maratonformulario.appspot.com",
  messagingSenderId: "1026924599827",
  appId: "1:1026924599827:web:8f02b532d6df065a93bde6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const guardarGrupo  = async (id, nombre, clave, categoriaTexto, categoriaNumero, nIntegrantes,
     e1Nombre, e1Apellido, e1Email, e1Codigo,
     e2Nombre, e2Apellido, e2Email, e2Codigo,
     e3Nombre, e3Apellido, e3Email, e3Codigo) =>{

    const idCategoria = await obtenerIdCategoria(categoriaTexto);
    const usuario = categoriaTexto+idCategoria

    addDoc(collection(db,'Grupos'),{ _id: id, idCategoria: idCategoria, usuario,
      nombre, clave, categoriaTexto, categoriaNumero, nIntegrantes,
      e1Nombre, e1Apellido, e1Email, e1Codigo,
      e2Nombre, e2Apellido, e2Email, e2Codigo,
      e3Nombre, e3Apellido, e3Email, e3Codigo
    });

    return usuario;
};

const obtenerIdCategoria = async (categoriaTexto) => {

  var idCategoria = 0;

  const docRef = doc(db, "categorias", "cantidad");
  const documento = await getDoc(docRef);

  if (categoriaTexto == "Basica"){
      idCategoria = documento.data().basica+1;
      await setDoc(docRef, {
        basica: idCategoria,
        intermedia: documento.data().intermedia,
        avanzada: documento.data().avanzada,
        elite: documento.data().elite
      });
  } else if (categoriaTexto == "Intermedia"){
    idCategoria = documento.data().intermedia+1;
      await setDoc(docRef, {
        basica: documento.data().basica,
        intermedia: idCategoria,
        avanzada: documento.data().avanzada,
        elite: documento.data().elite
      });
  } else if (categoriaTexto == "Avanzada"){
    idCategoria = documento.data().avanzada+1;
      await setDoc(docRef, {
        basica: documento.data().basica,
        intermedia: documento.data().intermedia,
        avanzada: idCategoria,
        elite: documento.data().elite
      });
  } else {
    idCategoria = documento.data().elite+1;
      await setDoc(docRef, {
        basica: documento.data().basica,
        intermedia: documento.data().intermedia,
        avanzada: documento.data().avanzada,
        elite: idCategoria
      });
  }
  return idCategoria;
}

export const obtenerGrupos =  () => {
  // const refGrupos = ref(getDocs(collection(db,'Grupos')));
  return getDocs(query(collection(db,'Grupos'), orderBy('_id')));
};

export const obtenerGruposElite = () => {
  return getDocs(query(collection(db,'Grupos'), where("categoriaTexto", "==", "Elite")))
};

export const obtenerGruposAvanzada = () => {
  return getDocs(query(collection(db,'Grupos'), where("categoriaTexto", "==", "Avanzada")))
};

export const subirArchivo = async (archivoTeams, archivoAccounts) => {
  const storageRef = getStorage();
  const teamsRef = ref(storageRef, "teams.tsv");
  const accountsRef = ref(storageRef, "accounts.tsv");
  await uploadBytes(teamsRef, archivoTeams).then((snapshot) => {

  });
  await uploadBytes(accountsRef, archivoAccounts).then((snapshot) => {

  });
};

export const subirArchivoCorreos = async (archivoCorreos) => {
  const storageRef = getStorage();
  const correoRef = ref(storageRef, "correos.tsv");
  await uploadBytes(correoRef, archivoCorreos).then((snapshot) => {

  });
};