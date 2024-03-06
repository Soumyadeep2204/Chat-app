import io from "socket.io-client";
import "./App.css";
import { useState } from "react";
import Chat from "./Chat.js";
import { useToast } from '@chakra-ui/react'

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [showChat, setShowChat] = useState(false);
  const toast = useToast()

  const joinRoom = () => {
 
    if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
      setShowChat(true);
    }else{
      toast({
        title: "Please fill in all fields",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setRoomID(e.target.value);
            }}
            required
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} roomID={roomID} />
      )}
    </div>
  );
};

export default App;
