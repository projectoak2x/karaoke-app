// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { initFirebase } from "@/firebaseApp/clientApp";
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { getFirestore, QueryDocumentSnapshot } from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore"; 

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const app = initFirebase();
  const db = getFirestore(app);
  console.log(req)
  try {
    const docRef = await addDoc(collection(db, "users"), {
      list: Date().toLocaleString(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  res.status(200).json({ name: 'John Doe' })
}
