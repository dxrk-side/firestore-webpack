
import { initializeApp } from "firebase/app";
import { getFirestore,doc, setDoc,addDoc, collection, Timestamp, getDocs, deleteDoc } from 'firebase/firestore';

const firebaseConfig = { 
  apiKey: "AIzaSyAXOml63EPJsUo8YzxqN2u9UuK4oR44wfs",
  authDomain: "appstore-100.firebaseapp.com",
  projectId: "appstore-100",
  storageBucket: "appstore-100.appspot.com",
  messagingSenderId: "257667614611",
  appId: "1:257667614611:web:c0f289c47197d504b24a66",
  measurementId: "G-SRWNT0S5WF"
};

// ini firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'fomData')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({...doc.data(), id: doc.id})
    })
    console.log(books);
  })
  .catch( err => {
    console.log(err.message);
  })

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.prevenDefault()

  addDoc(colRef, {
    title : addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
  console.log('');
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.prevenDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
  .then( () => {
    deleteBookForm.reset()
  })
})

