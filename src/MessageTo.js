import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageContex from "./MessageContex";
import DisplayMessages from "./DisplayMessages";
import { Button, Form } from "react-bootstrap";
function MessageTo() {
  let user = localStorage.getItem("email");
  let token = localStorage.getItem("token");
  let { target } = useParams();
  let [messageText, setMessageText] = useState("");
  let [messageSended, setMessageSended] = useState(0);
  let apiKey = process.env.REACT_APP_API_KEY;

  let contextSetter = {
    user: user,
    token: token,
    target: target,
    messageSended: messageSended,
  };

  useEffect(() => {
    async function makeMessageDb() {
      await axios.get(`${apiKey}/makeMessageDb/${user}/${target}`, {
        headers: {
          Authorization: token,
        },
      });
    }
    makeMessageDb();
  }, [user, target, token, apiKey]);

  async function sendMessage() {
    if (messageText.trim() === "") {
      return;
    }
    await axios.post(
      `${apiKey}/messageTo/${user}/${target}`,
      { messageText },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setMessageText("");
    setMessageSended(messageSended + 1);
  }

  return (
    <MessageContex.Provider value={contextSetter}>
      <div style={{ height: "85vh" }}>
        <div className="messageDiv">
          <DisplayMessages />
        </div>
        <div className="w-100 d-flex justify-content-center messageInput py-1">
          <div className="d-flex w-75 py-1 rounded-pill">
            <Form.Control
              value={messageText}
              type="text"
              onChange={(e) => setMessageText(e.target.value)}
              className="rounded-start-pill"
            />
            <Button
              onClick={() => sendMessage()}
              className="rounded-end-pill pe-3"
            >
              send
            </Button>
          </div>
        </div>
      </div>
    </MessageContex.Provider>
  );
}

export default MessageTo;
