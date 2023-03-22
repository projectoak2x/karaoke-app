import { useState } from "react";


function useLobby() {
  const [lobbyDetails, setLobbyDetails] = useState({
    lobbyName: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  function toggleModal() {
    setShow(!show)
  }

  const handleChange = (key: string, value: string) => {
    setLobbyDetails((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return {lobbyDetails, setLobbyDetails, show, toggleModal, handleChange}

}

export default useLobby;