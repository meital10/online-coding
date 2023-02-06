import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// to highlight the blaock code syntax. need to be fixed before use
// import hljs from "highlight.js";
// import "highlight.js/styles/default.css";

import "./CodeBlockPage.css";

const CodeBlockPage = ({ socket }) => {
  // const textAreaRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState({});
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    socket.emit("get-chosen-code", id);
    socket.on("response-chosen-code", (data) => {
      setCode(data.result);
      setUserType(data.userType);
    });
  }, [socket, id]);

  useEffect(() => {
    socket.on("editCodeBlock-response", (data) => {
      console.log("THE CAHNGED DATA", data);
      console.log("DATAID AND CODEID :", code._id);

      // temporary solution for getting the update code block from the server.
      //  A better solution would be using rooms in socket.io on the server
      if (data.id === code._id) {
        setCode({ ...code, code: data.code });
      }
    });
  }, [socket, code]);

  const handleEditCode = (e) => {
    setCode({ ...code, code: e.target.value });

    socket.emit("editCodeBlock", { code: e.target.value, id: code._id });
  };

  const handleBtnClick = () => {
    navigate("/");
    window.location.reload();
  };

  // useEffect(() => {
  //   hljs.highlightBlock(textAreaRef.current);
  // }, [code]);

  return (
    <>
      <h2 className="welcome-user">Hello {userType}</h2>

      <header className="code-header">
        <p>{code.title}</p>
      </header>
      <div className="code-container">
        <textarea
          className="code-erea"
          type="text"
          value={code.code}
          onInput={handleEditCode}
          readOnly={userType === "mentor"}
        ></textarea>

        <button className="btn" onClick={handleBtnClick}>
          BACK TO LOBBY
        </button>
      </div>
    </>
  );
};

export default CodeBlockPage;

{
  /* <pre>
<code
  className="javascript"
  ref={textAreaRef}
  type="text"
  contentEditable={true}
  onChange={handleEditCode}
  readOnly={userType === "mentor"}
  // contentEditable={userType === "student"}
  //   suppressContentEditableWarning={true}
>
  {code.code}
</code>
</pre> */
}
