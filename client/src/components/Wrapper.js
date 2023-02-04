import React, { useState, useEffect } from "react";
// import ChatBar from "../components/ChatBar";
import CodeBlockPage from "../components/codeBlockPage/CodeBlockPage";
// import ChatFooter from "../components/ChatFooter";

const Wrapper = ({ socket }) => {
  const [codes, setCodes] = useState([]);
  return (
    <div>
      {/* <ChatBar socket={socket} /> */}
      <div>
        <CodeBlockPage socket={socket} codes={codes} />
        {/* <ChatFooter socket={socket} /> */}
      </div>
    </div>
  );
};

export default Wrapper;
