import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { initFirebase } from "../firebaseApp/clientApp";
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { DocumentData, getFirestore, query, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import 'firebase/firestore';

// // Configure FirebaseUI.
// const uiConfig = {
//   // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: "/",
//   // We will display GitHub as auth providers.
//   signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
// };
interface TestData {
  list: string
}

function SignInScreen() {
  const app = initFirebase();
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const [list, loadingList] = useCollection(collection(db, "lobbies"))
  const [testList, setTestList] = useState<DocumentData>([]);

  useEffect(()=>{
    if(!loadingList && list){
      const docs = list.docs.map((doc) => {
        const data = doc.data()
          data.id = doc.id
          return data
      });
      setTestList(docs);
      console.log(docs)
    }
  },[loadingList, list])

  const addList = async () => {
    try {
      const docRef = await addDoc(collection(db, "lobbies"), {
        list: Date().toLocaleString(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  if(loading){
    return <div>Loading...</div>;
  }
  const signIgn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user)
  }
  return (
    <>
    {
      user?<div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >Welcome {user.displayName} 
      {testList.map((doc:DocumentData)=>{
        return (
          <div key={doc.id}>{doc.lobbyName}</div>
        )
      })}
      <button className="text-red-500" onClick={()=>addList()}>add test</button> 
      <button onClick={()=>auth.signOut()}>Sign Out</button>
      </div>:
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <button onClick={signIgn}>
        Sign In
      </button>
    </div>
    }
    </>
  );
}

export default SignInScreen;