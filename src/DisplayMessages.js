import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import MessageContex from "./MessageContex";
import { Navigate } from "react-router-dom";
import { ListGroup, ListGroupItem, Image } from "react-bootstrap";
function DisplayMessages() {
  let [messagesData, setMessageData] = useState([]);
  let { messageSended } = useContext(MessageContex);
  let { user } = useContext(MessageContex);
  let { token } = useContext(MessageContex);
  let { target } = useContext(MessageContex);
  let [loader, setLoader] = useState(true);
  let apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    async function getMessagesData() {
      try {
        let messagesData = await axios.get(
          `${apiKey}/getMessagesData/${user}/${target}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setLoader(true);
        setMessageData(messagesData.data.result);
      } catch (err) {
      } finally {
        setLoader(false);
      }
    }
    getMessagesData();
  }, [user, target, token, messageSended, apiKey]);

  return (
    <>
      {messagesData === "token error" ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <div
            className="px-5 bg-success"
            style={{
              height: "10%",
            }}
          >
            <h1>{target}</h1>
          </div>
          <ListGroup
            className="rounded-0 d-flex flex-column-reverse"
            style={{
              position: "relative",
              height: "90%",
              overflow: "auto",
            }}
          >
            {loader === true ? (
              <ListGroup.Item className="px-5">
                <Loading />
              </ListGroup.Item>
            ) : messagesData.length !== 0 ? (
              messagesData.map((item, key) => (
                <ListGroupItem
                  className={`d-flex border-0 px-5 ${
                    messagesData[messagesData.length - (key + 1)].sender ===
                    user
                      ? "flex-row-reverse"
                      : ""
                  }`}
                  style={{ backgroundColor: "transparent" }}
                  key={key + 1}
                >
                  {messagesData[messagesData.length - (key + 1)].pic ? (
                    <Image
                      src={messagesData[messagesData.length - (key + 1)].pic}
                      alt=""
                      width={"100px"}
                      rounded
                    />
                  ) : (
                    <ListGroup.Item
                      className={`bg-success rounded ${
                        messagesData[messagesData.length - (key + 1)].sender ===
                        user
                          ? "bg-danger flex-row-reverse px-5"
                          : "bg-primary px-5"
                      }`}
                    >
                      {messagesData[messagesData.length - (key + 1)].text}
                    </ListGroup.Item>
                  )}
                </ListGroupItem>
              ))
            ) : (
              <h1 className="px-5">no messages yet</h1>
            )}
          </ListGroup>
        </>
      )}
    </>
  );
}

export default DisplayMessages;
