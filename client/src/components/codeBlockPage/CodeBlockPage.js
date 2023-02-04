import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import hljs from 'highlight.js';
// import 'highlight.js/styles/default.css';
// install----- npm install highlight.js --save
import "./CodeBlockPage.css";

const CodeBlockPage = ({ socket }) => {
  const { codeId } = useParams();
  const [code, setCode] = useState("");
  const [userType, setUserType] = useState(null);
  // const [code, setCode] = useState({});
  // const [codes, setCodes] = useState([]);

  useEffect(() => {
    socket.emit("get-chosen-code", codeId);
    socket.on("response-chosen-code", (data) => {
      setCode(data.result);
      setUserType(data.userType);
    });
  }, [socket, codeId]);

  // const handleLeaveChat = () => {
  //   localStorage.removeItem("userName");
  //   navigate("/");
  //   window.location.reload();
  // };

  const handleEditCode = (e) => {
    // e.preventDefault();
    console.log("handleCode is working");
    // if (code.trim() && localStorage.getItem("userName")) {
    socket.emit("editCodeBlock", e.target.value);
    // socket.emit("code", {
    //   code: code,
    //   // name: localStorage.getItem("userName"),
    //   id: `${socket.id}${Math.random()}`,
    //   socketID: socket.id,
    // });
    // }

    setCode(e.target.value);
  };

  // useEffect to highlight the code block. change the state name from messages
  // useEffect(() => {
  //   codeBlocks.forEach(block => {
  //     hljs.highlightBlock(block);
  //   });
  // }, [codeBlocks]);

  return (
    <>
      <h2>Hello {userType}</h2>
      <header className="code-header">
        <p>Code Block Name</p>
        {/* <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button> */}
      </header>

      <div className="code-container">
        {/* <h2>{code.title}</h2> */}
        {/* {code.length > 0 && ( */}
        <textarea
          className="code-erea"
          type="text"
          value={code}
          onChange={handleEditCode}
        ></textarea>
        {/* )} */}

        {/* <div className="message__chats">
          <p>{message.name}</p>
          <div className="message__recipient">
            <p>{message.text}</p>
          </div>
        </div> */}

        {/* <div className="message__status">
          <p>Someone is typing...</p>
        </div> */}
      </div>
    </>
  );
};

{
  /* <div className="message__container">
{messages.map((message) =>
  message.name === localStorage.getItem("userName") ? (
    <div className="message__chats" key={message.id}>
      <p className="sender__name">You</p>
      <div className="message__sender">
        <p>{message.text}</p>
      </div>
      <textarea>heloooo</textarea>
    </div>
  ) : (
    <div className="message__chats" key={message.id}>
      <p>{message.name}</p>
      <div className="message__recipient">
        <p>{message.text}</p>
      </div>
    </div> */
}

export default CodeBlockPage;
