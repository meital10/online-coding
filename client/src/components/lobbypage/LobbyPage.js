import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LobbyPage.css";

const LobbyPage = ({ socket }) => {
  const navigate = useNavigate();
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    socket.on("output-codes-names", (data) => {
      console.log("output codes names:", data);
      setCodes([...data]);
    });
  }, [socket, codes]);

  const chosenCodeClicked = (codeId) => {
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
              className="code-name"
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
