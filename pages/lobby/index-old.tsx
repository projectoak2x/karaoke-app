import React, { ChangeEvent, useEffect, useState } from "react";
import { initFirebase } from "../../firebaseApp/clientApp";
import ytsr from "ytsr";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import "firebase/firestore";
import { useRouter } from "next/router";
import axios from "axios";
// import bcrypt from 'bcrypt'
import LobbyModal from "@/components/LobbyModal";
import useLobby from "@/hooks/useLobby";

function SingleLobby() {
  const app = initFirebase();
  const db = getFirestore(app);
  const [inLobby, setInLobby] = useState(false);
  const [lobby, setLobby] = useState<DocumentData>({});
  const [lobbies, setLobbies] = useState<DocumentData>([]);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [lobbyId, setLobbyId] = useState("");
  const [isMaster, setIsMaster] = useState(false);
  const [allPlayed, setAllPlayed] = useState(false);

  const { lobbyDetails, setLobbyDetails, show, toggleModal, handleChange } =
    useLobby();

  const SelectLobby = (item: any) => {
    setLobbyDetails((prevState) => {
      return { ...prevState, lobbyName: item.lobbyName };
    });
    setLobby(item);
    toggleModal();
  };

  const JoinLobby = () => {
    try {
      // const password = props.lobbyDetails.password;
      // const saltRounds = 10;
      // const hashedPassword = bcrypt.compare(password, saltRounds));
      if (lobbyDetails.password === lobby.password)
      console.log(lobby)
        localStorage.setItem("lobby", lobby.id);
        setInLobby(true);
        setLobbyId(lobby.id)
        toggleModal();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const LeaveLobby = () => {
    setInLobby(false);
    localStorage.removeItem("lobby");
  };

  const getLobbies = async () => {
    const docRef = collection(db, "lobbies");
    const docSnapshot = await getDocs(docRef);
    setLobbies(
      docSnapshot.docs.map((docs) => {
        const docBuffer = docs.data();
        docBuffer.id = docs.id
        return docBuffer;
      })
    );
  };

  // const getData = async (lobbyId: string) => {
  //   const docRef = doc(db, "lobbies", lobbyId);
  //   const docSnapshot = await getDoc(docRef);
  //   setLobby(docSnapshot.data() ?? {});
  //   console.log(docSnapshot.data() ?? {});
  // };

  useEffect(() => {
    if(lobbyId=="") return

    const itemsRef = doc(db, "lobbies", lobbyId);
    const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
      console.log(snapshot.data())
      const docBuffer = snapshot.data() ?? {};
      docBuffer.id = snapshot.id
      setLobby(docBuffer);
    });

    return () => unsubscribe();
  }, [lobbyId]);

  useEffect(() => {
    if (localStorage.getItem("lobby")) {
      setInLobby(true);
      const lobbyIdBuffer = localStorage.getItem("lobby")?.toString() ?? "";
      // getData(lobbyIdBuffer);
      setLobbyId(lobbyIdBuffer);
      if (localStorage.getItem("createdLobby") == lobbyIdBuffer) {
        setIsMaster(true);
      }
    } else {
      getLobbies();
    }
    if (localStorage.getItem("videoIndex"))
      setVideoIndex(parseInt(localStorage.getItem("videoIndex") ?? "0"));
    else localStorage.setItem("videoIndex", "0");
  }, []);

  let timeoutId: string | number | NodeJS.Timeout | undefined;

  const SearchVideo = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      const search =
        e.target.value.includes("karaoke") ||
        e.target.value.includes("instrumental")
          ? e.target.value
          : e.target.value + " karaoke";
      const youtubeSearch = await axios.get("api/search-video", {
        params: { s: search },
      });
      setSearchResult(youtubeSearch.data.videos);
    }, 400);
  };
  function videoEnd(e: any) {
    // What you want to do after the event
    console.log("end");
    if (lobby.songList.length > videoIndex + 1) {
      setVideoIndex(videoIndex + 1);
      localStorage.setItem("videoIndex", (videoIndex + 1).toString());
    }
  }

  function Next() {
    // What you want to do after the event
    console.log(videoIndex);
    console.log("Next");
    if (lobby.songList.length > videoIndex + 1) {
      setVideoIndex(videoIndex + 1);
      localStorage.setItem("videoIndex", (videoIndex + 1).toString());
    }
  }

  function Previous() {
    // What you want to do after the event
    console.log(videoIndex);
    console.log("Previous");
    if (videoIndex > 0) {
      setVideoIndex(videoIndex - 1);
      localStorage.setItem("videoIndex", (videoIndex - 1).toString());
    }
  }

  const playAudio = () => {
    const audioPlayer = document?.getElementById(
      "audio-player"
    ) as HTMLMediaElement;
    const videoPlayer = document?.getElementById(
      "video-player"
    ) as HTMLMediaElement;
    audioPlayer.currentTime = videoPlayer?.currentTime;
    audioPlayer?.play();
  };

  const seekVideo = (e: React.KeyboardEvent<HTMLVideoElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const audioPlayer = document?.getElementById(
        "audio-player"
      ) as HTMLMediaElement;
      const videoPlayer = document?.getElementById(
        "video-player"
      ) as HTMLMediaElement;
      audioPlayer.currentTime = videoPlayer.currentTime;
    }
  };

  const pauseAudio = () => {
    const audioPlayer = document?.getElementById(
      "audio-player"
    ) as HTMLMediaElement;
    const videoPlayer = document?.getElementById(
      "video-player"
    ) as HTMLMediaElement;
    audioPlayer.currentTime = videoPlayer.currentTime;
    audioPlayer?.pause();
  };

  useEffect(() => {
    document
      ?.getElementById("video-player")
      ?.addEventListener("ended", videoEnd, false);
    // let audioPlayer = document?.getElementById('audio-player');
    // document?.getElementById('video-player')?.addEventListener('onplay',playAudio,false);
  });

  const AddSong = async (item: any) => {
    console.log(item);
    console.log(lobbyId)
    const lobbyRef = doc(db, "lobbies", lobbyId);
    const newSong = {
      songId: item.id,
      songTitle: item.title,
      status: "queue",
      user: "test-user",
    };
    await updateDoc(lobbyRef, { songList: arrayUnion(newSong) });
    window.scrollTo(0, 0);
  };

  const RemoveSong = async (item: any) => {
    const lobbyRef = doc(db, "lobbies", lobbyId);
    await updateDoc(lobbyRef, { songList: arrayRemove(item) });
  };

  return (
    <>
      <div>
        <div>
          {inLobby ? (
            <div>
              <div>
                <div>
                  {lobby.songList && isMaster ? (
                    lobby.songList && (
                      <>
                      <video
                        id="video-player"
                        src={`api/stream-video?id=${lobby.songList[videoIndex].songId}`}
                        controls
                        autoPlay
                        className="h-auto w-96"
                        onPlay={playAudio}
                        onPause={pauseAudio}
                        onKeyUp={(e) => seekVideo(e)}
                      >
                        <audio id="audio-player" controls src={`api/stream-audio?id=${lobby.songList[videoIndex].songId}`} />
                      </video>
                      </>
                    )
                  ) : (
                    ''
                  )}
                  <div className="px-5 pt-5">
                    Song List:
                                    {(lobby.songList) &&
                    lobby.songList.map((item: any, index: number) => {
                      return <div className="border-2 p-2" key={item.songId}>{item.songTitle}<span onClick={()=>RemoveSong(item)}> remove</span></div>;
                    })}
                  {isMaster && <>
                    <button onClick={() => Previous()}>previous</button>
                    <button onClick={() => Next()}>next</button>
                  </>}
                  </div>
                  {/* <button onClick={LeaveLobby}>leave</button> */}
                </div>
              </div>
              <div className="p-5">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => SearchVideo(e)}
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <div className="flex flex-col space-y-1">
                  {searchResult.map((item: any, index: number) => {
                    return (
                      <div key={item.id} onClick={() => AddSong(item)}>
                        <h6>{item.title}</h6>
                        <img
                          src={
                            item.thumbnails[1]
                              ? item.thumbnails[1].url
                              : item.thumbnails[0].url
                          }
                          alt=""
                          className="h-auto max-w-full"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <span>Join Lobby</span>
              <div>
                {lobbies.map((item: any, index: number) => {
                  return (
                    <div key={index} onClick={() => SelectLobby(item)}>
                      {item.lobbyName}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <LobbyModal
          lobbyDetails={lobbyDetails}
          show={show}
          toggleModal={toggleModal}
          onChange={handleChange}
          onJoin={JoinLobby}
        />
      </div>
    </>
  );
}

export default SingleLobby;
