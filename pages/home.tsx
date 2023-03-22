import { initFirebase } from "../firebaseApp/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, QueryDocumentSnapshot } from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lobbyDetails, setLobbyDetails] = useState({
    lobbyName: "",
    password: "",
  });
  const app = initFirebase();
  const db = getFirestore(app);

  const ToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (key: string, value: string) => {
    setLobbyDetails((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const CreateLobby = async () => {
    try {
      const password = lobbyDetails.password;
      // const saltRounds = 10;
      // const hashedPassword = bcrypt.hash(password, saltRounds);
      const docRef = await addDoc(collection(db, "lobbies"), {
        lobbyName: lobbyDetails.lobbyName,
        lobbyPassword: password,
      });
      localStorage.setItem("lobby", docRef.id);
      router.push("/lobby");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {});
  return (
    <>
      <nav className="container relative mx-auto p-6">
        <div className="flex items-center justify-between">
          <div id="logo" className="logo">
            This is Logo
          </div>
          <div className="flex justify-between space-x-6">
            <a href="#">
              <button onClick={() => ToggleModal()}>Create Lobby</button>
            </a>
            <a href="tailwind">Search Lobby</a>
          </div>
        </div>
      </nav>
      <div>
        <div
          className={`fixed top-0 left-0 z-10 w-full overflow-y-auto ${
            showModal ? "" : "hidden"
          }`}
          id="modal"
        >
          <div className="min-height-100vh flex items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
              &#8203;
            </span>
            <div
              className="align-center inline-block transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label>Lobby Name</label>
                <input
                  type="text"
                  className="mt-2 mb-3 w-full bg-gray-100 p-2"
                  onChange={(e) => handleChange("lobbyName", e.target.value)}
                  required
                />
                <label>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-2 mb-3 w-full bg-gray-100 p-2"
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-6 text-gray-700"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="h-6 text-gray-700"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 610 512"
                      >
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="mr-2 rounded bg-gray-500 py-2 px-4 text-white hover:bg-gray-700"
                  onClick={() => ToggleModal()}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button
                  type="button"
                  className="mr-2 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                  onClick={() => CreateLobby()}
                >
                  <i className="fas fa-plus"></i> Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
