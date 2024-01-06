import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import dataGetterFunction from "./DateGetterFunction";
import { Navigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
function Messages() {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("email");
  let [data, setData] = useState([]);
  let [loader, setLoader] = useState(true);

  useEffect(() => {
    dataGetterFunction("messages", setData, setLoader);
  }, [token, user]);

  return (
    <>
      {data === "token error" ? (
        <Navigate to={"/"} />
      ) : (
        <div style={{ minHeight: "90vh", maxHeight: "fit-content" }}>
          {loader ? (
            <Loading />
          ) : (
            <ListGroup className="p-5 rounded-0">
              <ListGroup.Item
                className="rounded-top border-dark"
                style={{ backgroundColor: "rgb(255, 235, 215)" }}
              >
                Message to
              </ListGroup.Item>
              {data.map((item, key) => (
                <ListGroup.Item
                  key={key}
                  className="border-dark"
                  style={{ backgroundColor: "rgb(255, 235, 215)" }}
                >
                  <Link
                    to={`/messageTo/${item}`}
                    className="fullWidthLinkStyle"
                    style={{ backgroundColor: "rgb(255, 235, 215)" }}
                  >
                    <h2>{item}</h2>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      )}
    </>
  );
}

export default Messages;
