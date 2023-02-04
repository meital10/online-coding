import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LobbyPage from "./components/lobbypage/LobbyPage";
import Wrapper from "./components/Wrapper";
import CodeBlockPage from "./components/codeBlockPage/CodeBlockPage";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LobbyPage socket={socket} />}></Route>
          <Route
            // path="/code"
            path="/:id"
            element={<CodeBlockPage socket={socket} />}
          ></Route>
          {/* <Route path="/code" element={<Wrapper socket={socket} />}></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";

// const App = () => {
//   const [response, setResponse] = useState(false);

//   useEffect(() => {
//     const socket = socketIOClient("http://localhost:3000");
//     socket.on("connect", () => {
//       console.log("Connected to the server");
//       setResponse(true);
//     });
//     socket.on("disconnect", () => {
//       console.log("Disconnected from the server");
//       setResponse(false);
//     });
//   }, []);

//   return <div>{response ? "Connected" : "Disconnected"}</div>;
// };

export default App;
