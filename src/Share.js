import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import BlueLoading from "./CommentsLoading";
import dataGetterFunction from "./DateGetterFunction";
import { Navigate } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import MyContext from "./HomeMyContext";
function Share(p) {
  let user = localStorage.getItem("email");
  let token = localStorage.getItem("token");
  let [followingsList, setFollowingsList] = useState([]);
  let [selectedPeople, setSelectedPeople] = useState([]);
  let [loader, setLoader] = useState(true);
  let targetedPic = p.targetedPic;
  let { setShowShareList } = useContext(MyContext);
  let apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    dataGetterFunction("getfollowingsList", setFollowingsList, setLoader);
  }, [token, user]);

  async function share() {
    if (selectedPeople.length !== 0) {
      await axios.post(
        `${apiKey}/share/${user}/${targetedPic}`,
        { selectedPeople },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSelectedPeople([]);
      setShowShareList(false);
    }
  }

  return (
    <>
      {followingsList === "token error" ? (
        <Navigate to={"/"} />
      ) : (
        <>
          {loader ? (
            <BlueLoading />
          ) : (
            <ListGroup className=" position-relative">
              <ListGroup.Item>
                <h2>share to:</h2>
              </ListGroup.Item>
              {followingsList.map((item, key) => (
                <ListGroup.Item
                  key={key}
                  className="d-flex justify-content-between"
                  variant="dark"
                >
                  <div htmlFor={item}>
                    <h1>{item}</h1>
                  </div>
                  <input
                    name={item}
                    type="checkbox"
                    onChange={(e) => {
                      e.target.checked
                        ? selectedPeople.push(item)
                        : setSelectedPeople(
                            selectedPeople.filter(
                              (filterItem) => filterItem !== item
                            )
                          );
                    }}
                    className="checkBoxStyle w-25"
                  />
                </ListGroup.Item>
              ))}
              <ListGroup.Item
                variant="dark"
                className="d-flex justify-content-end"
              >
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedPeople([]);
                    setShowShareList(false);
                  }}
                >
                  cancel
                </Button>
                <Button
                  onClick={() => {
                    share();
                  }}
                  className="ms-3"
                >
                  Send
                </Button>
              </ListGroup.Item>
            </ListGroup>
          )}
        </>
      )}
    </>
  );
}

export default Share;
