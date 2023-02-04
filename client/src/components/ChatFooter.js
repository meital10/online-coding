import React, { useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    // setMessage("");
    setMessage(e.target.value);
  };
  return (
    <div className="chat__footer">
      {/* <form className="form" onSubmit={handleSendMessage}> */}
      {/* <form className="form"> */}
      <textarea
        type="text"
        placeholder="Write message"
        className="message"
        value={message}
        // onChange={(e) => setMessage(e.target.value)}
        onChange={handleSendMessage}
      ></textarea>
      <button className="sendBtn">SEND</button>
      {/* </form> */}
    </div>
  );
};

export default ChatFooter;
