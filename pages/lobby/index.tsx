import React, { ChangeEvent, useEffect, useState } from "react";
import { initFirebase } from "../../firebaseApp/clientApp";
import ytsr from "ytsr";
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import "firebase/firestore";
import { useRouter } from "next/router";
import axios from "axios";

function SingleLobby() {
  const app = initFirebase();
  const db = getFirestore(app);
  const [inLobby, setInLobby] = useState(false);
  const [lobby, setLobby] = useState<DocumentData>({});
  const [video, setVideo] = useState("api/stream-video?id=UuGannvDvQk");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [lobbyId, setLobbyId] = useState("");

  const getData = async (lobbyId: string) => {
    const docRef = doc(db, "lobbies", lobbyId);
    const docSnapshot = await getDoc(docRef);
    setLobby(docSnapshot.data() ?? {});
    console.log(docSnapshot.data() ?? {});
  };
  useEffect(() => {
    if (localStorage.getItem("lobby")) {
      setInLobby(true);
      const lobbyIdBuffer = localStorage.getItem("lobby")?.toString() ?? ""
      getData(lobbyIdBuffer);
      setLobbyId(lobbyIdBuffer);
    }
    if(localStorage.getItem("videoIndex")) setVideoIndex(parseInt(localStorage.getItem("videoIndex")??"0"));
    else localStorage.setItem("videoIndex", "0");
  }, []);

  let timeoutId: string | number | NodeJS.Timeout | undefined;

  const SearchVideo = (e:ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async ()=>{
      const search = (e.target.value.includes('karaoke') || e.target.value.includes('instrumental')) ? e.target.value : e.target.value + " karaoke"
      const youtubeSearch = await axios.get('api/search-video',{ params: { s: search } });
      setSearchResult(youtubeSearch.data.videos)
    }, 400)

  }
  function videoEnd(e:any) {
    // What you want to do after the event
    console.log("end")
    if(lobby.songList.length>videoIndex+1){
      setVideoIndex(videoIndex+1)
      localStorage.setItem("videoIndex", (videoIndex+1).toString())
    }
}

function Next() {
  // What you want to do after the event
  console.log(videoIndex)
  console.log("Next")
  if(lobby.songList.length>videoIndex+1){
    setVideoIndex(videoIndex+1)
    localStorage.setItem("videoIndex", (videoIndex+1).toString())
  }
}

function Previous() {
  // What you want to do after the event
  console.log(videoIndex)
  console.log("Previous")
  if(videoIndex>0){
    setVideoIndex(videoIndex-1)
    localStorage.setItem("videoIndex", (videoIndex-1).toString())
  }
}

const playAudio = () => {
  const audioPlayer = document?.getElementById('audio-player') as HTMLMediaElement;
  const videoPlayer = document?.getElementById('video-player') as HTMLMediaElement;
  audioPlayer.currentTime = videoPlayer?.currentTime;
  audioPlayer?.play();
}

const seekVideo = (e: React.KeyboardEvent<HTMLVideoElement>) => {
  if(e.key === "ArrowRight" || e.key === "ArrowLeft"){
    const audioPlayer = document?.getElementById('audio-player') as HTMLMediaElement;
    const videoPlayer = document?.getElementById('video-player') as HTMLMediaElement;
    audioPlayer.currentTime = videoPlayer.currentTime;
  }

}

const pauseAudio = () => {
  const audioPlayer = document?.getElementById('audio-player') as HTMLMediaElement;
  const videoPlayer = document?.getElementById('video-player') as HTMLMediaElement;
  audioPlayer.currentTime = videoPlayer.currentTime;
  audioPlayer?.pause();
}

  useEffect(()=>{
    
    document?.getElementById('video-player')?.addEventListener('ended',videoEnd,false);
    // let audioPlayer = document?.getElementById('audio-player');
    // document?.getElementById('video-player')?.addEventListener('onplay',playAudio,false);
  })

  const AddSong = async (item:any) => {
    console.log(item)
    const lobbyRef = doc(db, "lobbies", lobbyId);
    const newSong = {
      songId: item.id,
      songTitle: item.title,
      status: 'queue',
      user: "test-user"
    };
    await updateDoc(lobbyRef, { songList: arrayUnion(newSong) });

  }

  return (
    <>
      <div>
        <div>
          {inLobby ? (
            <div>
              Document:{" "}
              <div>
                {lobby.lobbyName}
                <div>
                  {lobby.songList &&
                    lobby.songList.map((item: any, index: number) => {
                      return <div key={item.songId}>{item.songTitle}</div>;
                    })}
                    {lobby.songList && <video id="video-player" key={lobby.songList[videoIndex].songId} controls autoPlay className="w-96 h-auto" onPlay={playAudio} onPause={pauseAudio} onKeyUp={(e)=>seekVideo(e)} >
                      <source src={`api/stream-video/?id=${lobby.songList[videoIndex].songId}`} />
                      <audio id="audio-player" controls>
                        <source src={`api/stream-audio/?id=${lobby.songList[videoIndex].songId}`} />
                      </audio>
                    </video> }
                    <button
                    onClick={() => Previous()}
                  >
                    previous
                  </button>
                  <button
                    onClick={() => Next()}
                  >
                    next
                  </button>
                </div>
              </div>
              <div>
                <input type="text" placeholder="Search" onChange={(e)=>SearchVideo(e)} />
                <div className="flex flex-col space-y-1">
                {searchResult.map((item:any,index:number)=>{
                  return (
                    <div key={item.id} onClick={()=>AddSong(item)}>
                      <h6>{item.title}</h6>
                      <img src={item.thumbnails[1]?item.thumbnails[1].url:item.thumbnails[0].url} alt="" className="h-auto max-w-full" />
                    </div>
                  )
                })}
              </div>
              </div>
            </div>
          ) : (
            <span>Join Lobby</span>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleLobby;
