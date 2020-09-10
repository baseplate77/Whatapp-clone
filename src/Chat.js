import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Message from "./message";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import MicIcon from "@material-ui/icons/Mic";

function Chat({ home }) {
  const [input, setInput] = useState();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();
  const [roomName, setroomName] = useState();

  useEffect(() => {
    console.log(roomId);
    if (roomId) {
      var roomdoc = db.collection("rooms").doc(roomId);

      roomdoc.onSnapshot((snapshot) => {
        setroomName(snapshot.data().name);
        console.log("data", snapshot.data());
      });
      roomdoc
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  console.log(messages);

  const handleClick = async (e) => {
    console.log(firebase.firestore.FieldValue.serverTimestamp());
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="parent__chat">
      {home ? (
        <div className="chat__welcome">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"></img>
          <h2>Welcome To WhatsApp-Clone</h2>
        </div>
      ) : (
        <div className="chat">
          <div className="chat__header">
            <Avatar
              src={`https://avatars.dicebear.com/api/male/${roomId}.svg?options[mood][]=happy`}
            />
            <div className="chat__headerinfo">
              <h3>{roomName}</h3>
              <p>
                {messages[messages.length - 1]
                  ? `Last seen ${new Date(
                      messages[messages.length - 1]?.timestamp?.toDate()
                    )
                      .toUTCString()
                      .substring(0, 22)}`
                  : "No message found"}
              </p>
            </div>
            <div className="char__headerRight">
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
          <div className="chat__body">
            {messages?.map((message, index) => {
              return (
                <Message
                  key={index}
                  status={user.displayName == message.name}
                  name={message.name}
                  message={message.message}
                  timestamp={message.timestamp}
                />
              );
            })}
          </div>
          <div className="chat__footer">
            <EmojiEmotionsOutlinedIcon />
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type a message"
              ></input>
              <button onClick={handleClick} type="submit">
                send message
              </button>
            </form>
            <MicIcon />
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
