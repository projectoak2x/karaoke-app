import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { JWT } from "google-auth-library";
const SERVICE_ACCOUNT_FILE = "service_account.json";
const SCOPES = "https://www.googleapis.com/auth/youtube.force-ssl";

const API_KEY = "AIzaSyA-8VPy8ZVCGTQdxq3_oUFoy64hLXLDVTE";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const iframeRef = useRef(null);
  const [videoSource, setVideoSource] = useState('');
  const videoRef = useRef(null);
  const [pVideo, setpVideo] = useState('https://dd194.comuatraf.xyz/dl/u4MkRfyHO-U/1677433057/918a797371f1181ce1f79b67e87c9d631ddb7e3caa5271f921aaa2e1967c746d?file=aHR0cHM6Ly9ycjMtLS1zbi00ZzVlNm5zay5nb29nbGV2aWRlby5jb20vdmlkZW9wbGF5YmFjaz9leHBpcmU9MTY3NzQzMDk4MiZlaT1aano3WS1mTkxzZW04Z1BMX0p1d0F3JmlwPTE5NS4yMDEuMTA5LjI5JmlkPW8tQUJpTnVVaTF6Xy1LajdOTVJJWmVYMnVDNmFoMXIwbnp5RnRxeE10NG9hVjAmaXRhZz0yMiZzb3VyY2U9eW91dHViZSZyZXF1aXJlc3NsPXllcyZtaD1PSiZtbT0zMSUyQzI5Jm1uPXNuLTRnNWU2bnNrJTJDc24tNGc1ZWRuZHombXM9YXUlMkNyZHUmbXY9bSZtdmk9MyZwbD0yNSZpbml0Y3duZGJwcz0zNTc1MDAmc3BjPUgzZ0loaTNiTXpabDZrSFZtbUVNOE5LcGdqUWZ2cm8mdnBydj0xJnN2cHVjPTEmbWltZT12aWRlbyUyRm1wNCZjbnI9MTQmcmF0ZWJ5cGFzcz15ZXMmZHVyPTgzMS4xODEmbG10PTE2NzYxMTk0NzA1MDA5MDImbXQ9MTY3NzQwOTAyMyZmdmlwPTQmZmV4cD0yNDAwNzI0NiZjPUFORFJPSUQmdHhwPTU1MzI0MzQmc3BhcmFtcz1leHBpcmUlMkNlaSUyQ2lwJTJDaWQlMkNpdGFnJTJDc291cmNlJTJDcmVxdWlyZXNzbCUyQ3NwYyUyQ3ZwcnYlMkNzdnB1YyUyQ21pbWUlMkNjbnIlMkNyYXRlYnlwYXNzJTJDZHVyJTJDbG10JnNpZz1BT3EwUUo4d1JRSWhBSkY0Tm96b2pmaXJkX2ZPbU9ZZWhCZEZkTDVSZnIydk01cEE0UXZpV3FrLUFpQTRuaU9DT29samNSaF9iUWI3YURYNGdtblNYX01hV29IMGg0ODhXQi1Db1ElM0QlM0QmbHNwYXJhbXM9bWglMkNtbSUyQ21uJTJDbXMlMkNtdiUyQ212aSUyQ3BsJTJDaW5pdGN3bmRicHMmbHNpZz1BRzNDX3hBd1JRSWhBS3l6YlR2a0NneXVRWTRJTVgxQnNnTDE2N05IaEdfa0lqcUN3SnBZU2hydUFpQkN2QmIyeUdMaWRWRjlDVDloZVJpMW9PLVhZdWd6dnBLcER3cVhISlI5NVElM0QlM0QmaG9zdD1ycjMtLS1zbi00ZzVlNm5zay5nb29nbGV2aWRlby5jb20mbmFtZT1YMkRvd25sb2FkLmFwcC1TdW5raXNzZWQrTG9sYSslN2MrQWRpZSslN2MrQXJ0aHVyK05lcnkrJTdjK1Bhc2lseW8lMmMrVGFoYW5hbiUyYytJc2ErbGFuZysobHlyaWNzKSg3MjBwKS5tcDQ')

  async function handleSourceChange(event) {
    // const data = await axios.get('api/savefrom', {params: {id: event.target.value,}})
    setVideoSource(event.target.value)
    videoRef.current.pause();
    // console.log(url)
    // //videoRef.current.pause();
    setpVideo(`api/savefrom?id=${event.target.value}`);
  }

  useEffect(()=>{
    console.log(videoRef)
    if(videoRef){
      console.log(videoSource);
      setTimeout(()=>{
        videoRef.current.play();
      },100)

    }
  },[videoSource])



  const handleCreatePlaylist = async () => {

    const data = await axios.get('/api/gapi')
    console.log("asf")
    const config = {
        headers: { Authorization: `Bearer asf` }
    };
    axios.post(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,status&key=${API_KEY}`,
      {
        snippet: {
          title: title,
          description: description,
        },
        status: {
          privacyStatus: "private",
        },
      },
      config
    )
      .then(response => {
        setPlaylistId(response.data.id);
      })
      .catch(error => {
        console.error(`An error occurred: ${error}`);
        setPlaylistId("");
      });
  };

  function handleClick(e) {
    // Simulate a click event on the iframe
    console.log(e)
   // iframeRef?.current?.contentWindow?.document?.body?.click();
  }


  function playVideo() {
    videoRef.current.play();
  }



  return (
    <div>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleCreatePlaylist}>Create Playlist</button>
      {playlistId && <p>Created new playlist with ID: {playlistId}</p>}
      <iframe ref={iframeRef} onClick={e=>handleClick(e)} width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL3lsm7xHzXosqgvSUmv3zfEjrg54ubB_T" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      <div>
      <video key={pVideo} ref={videoRef} width="640" height="360" controls>
        <source key={pVideo} src={pVideo} type="video/mp4" />
      </video>
      <label>
        Video URL:
        <input type="text" value={videoSource} onChange={handleSourceChange} />
      </label>
    </div>
    </div>
  );
}

export default App;
