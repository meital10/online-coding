import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { diffIndexes } from "../../../../server/codeBlockSchema";
import "./LobbyPage.css";

const LobbyPage = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    socket.on("output-codes-names", (data) => {
      console.log("output codes names:", data);
      setCodes([...data]);
    });
  }, [socket, codes]);
  // add new user
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   localStorage.setItem("userName", userName);
  //   //sends the username and socket ID to the Node.js server
  //   socket.emit("newUser", { userName, socketID: socket.id });
  //   navigate("/chat");
  // };

  const chosenCodeClicked = (codeId) => {
    // localStorage.setItem("userName", userName);
    //sends the username and socket ID to the Node.js server

    // navigate("/code");
    navigate(`/${codeId}`);
  };
  return (
    <div>
      <header className="lobby-title">
        <p>Choose Code Block</p>
      </header>
      <div className="lobby-container">
        {codes &&
          codes.map((code) => (
            <div
              className="choose-code"
              key={code._id}
              onClick={() => chosenCodeClicked(code._id)}
            >
              {code.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default LobbyPage;
