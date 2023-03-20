import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { initFirebase } from "../firebase/clientApp";

// // Configure FirebaseUI.
// const uiConfig = {
//   // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: "/",
//   // We will display GitHub as auth providers.
//   signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
// };

function SignInScreen() {
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signIgn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user)
  }
  return (
    <div
      style={{
        maxWidth: "320px",
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
  );
}

export default SignInScreen;