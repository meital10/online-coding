import { BrowserRouter, Routes, Route } from "react-router-dom";
import LobbyPage from "./components/lobbypage/LobbyPage";
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
            path="/:id"
            element={<CodeBlockPage socket={socket} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
