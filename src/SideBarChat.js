import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";

function SideBarChat({ id, name }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  console.log(messages[0]?.message.length);

  return (
    <Link to={`/rooms/${id}`}>
      <div className="sideBarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/male/${id}.svg?options[mood][]=happy`}
        />
        <div className="sideBarChat__info">
          <h2>{name}</h2>
          <p>
            {messages[0]?.message.length > 12
              ? messages[0]?.message.substring(0, 10) + "..."
              : messages[0]?.message}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SideBarChat;
