import { useEffect, useState } from "react";
import Loading from "./Loading";
import dataGetterFunction from "./DateGetterFunction";
import { Navigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import "./App.css";
function Notifications() {
  let user = localStorage.getItem("email");
  let token = localStorage.getItem("token");
  let [notificationData, setNotificationData] = useState([]);

  let [loader, setLoader] = useState(true);

  useEffect(() => {
    dataGetterFunction("notifications", setNotificationData, setLoader);
  }, [token, user]);

  return (
    <div style={{ minHeight: "90vh", maxHeight: "fit-content" }}>
      {notificationData === "token error" ? (
        <Navigate to={"/"} />
      ) : loader ? (
        <Loading />
      ) : (
        <ListGroup>
          <ListGroup.Item
            className="rounded-0"
            style={{ backgroundColor: " rgb(255, 235, 215)" }}
          >
            Your notifiacations
          </ListGroup.Item>
          {notificationData.length === 0 ? (
            <ListGroup.Item
              className="rounded-0"
              style={{ backgroundColor: " rgb(255, 235, 215)" }}
            >
              no notifiacations yet
            </ListGroup.Item>
          ) : (
            notificationData.map((item, key) => (
              <div key={key}>
                <div className="d-flex">
                  {item.liker ? (
                    <ListGroup.Item className="w-75">
                      <b>{item.liker}</b> likes your post
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item className="w-75">
                      <b>{item.commenter}</b> comments on your post
                    </ListGroup.Item>
                  )}
                  <img src={item.post} alt="" width="40px" />
                </div>
              </div>
            ))
          )}
        </ListGroup>
      )}
    </div>
  );
}

export default Notifications;
