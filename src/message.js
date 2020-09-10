import React from "react";
import "./message.css";

function Message({ name, message, timestamp, status }) {
  return (
    <p className={!status ? "message" : "message message__reciever"}>
      <span className="message__name ">
        <strong>{name}</strong>
      </span>
      {message}
      <span className="message__timestamp">
        {new Date(timestamp?.toDate()).toUTCString().substring(17, 22)}
      </span>
    </p>
  );
}

export default Message;
