import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import "./App.css";
import {
  Button,
  Col,
  Container,
  Row,
  Image,
  ListGroup,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
let PeopleProfileContext = createContext();

function PeopleProfile() {
  let { target } = useParams();
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("email");
  let [data, setData] = useState("");
  let [userFollowerCheck, setUserFollowerCheck] = useState(false);
  let [loader, setloader] = useState(true);
  let [chevronToggle, setChevronToggle] = useState(null);
  let apiKey = process.env.REACT_APP_API_KEY;

  let peopleProfileContextSetter = {
    user: user,
    token: token,
    target: target,
    setter: setUserFollowerCheck,
  };

  useEffect(() => {
    async function getPeoleProfile() {
      try {
        let peopleProfileData = await axios.get(
          `${apiKey}/peopleProfile/${target}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setData(peopleProfileData.data.result);

        if (peopleProfileData.data.result) {
          setUserFollowerCheck(
            peopleProfileData.data.result.followers.includes(user)
              ? true
              : false
          );
        }
        setloader(true);
      } catch (err) {
        console.log(err);
      } finally {
        setloader(false);
      }
    }
    getPeoleProfile();
  }, [target, token, user, userFollowerCheck, apiKey]);

  return (
    <PeopleProfileContext.Provider value={peopleProfileContextSetter}>
      {loader ? (
        <Loading />
      ) : (
        <Container fluid className="pb-5">
          <Row className="d-flex justify-content-center">
            <Col xs={11} className="py-4">
              <h1>{data.personalInfo.userName}</h1>
              <Image
                src={
                  data.personalInfo.profilePic
                    ? data.personalInfo.profilePic
                    : "data:image/png;base64,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"
                }
                alt="imgo"
                width={"100px"}
                roundedCircle
              />
            </Col>
            <Col xs={7}>
              <FollowBotton
                purpose={data.followers.includes(user) ? "unFollow" : "follow"}
              />
            </Col>
          </Row>
          {data.personalInfo.settings.accountPrivacy === "public" ||
          userFollowerCheck === true ? (
            <>
              {/* {console.log(data)} */}
              <Row className="d-flex justify-content-center py-5">
                <Col lg={4} md={6} sm={9}>
                  <ListGroup className="rounded-0">
                    <ListGroup.Item>
                      <h5>followers: {data.followers.length}</h5>
                    </ListGroup.Item>
                    <ListGroup.Item variant="dark">
                      {data.followers.map((item, key) => (
                        <div className="textLinkStyle p-1" key={item}>
                          <Link
                            className="textLinkStyle d-flex"
                            to={`/peopleProfile/${item}`}
                          >
                            <Image
                              src={
                                data.followersProfilePic[key]
                                  ? data.followersProfilePic[key]
                                  : "data:image/png;base64,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"
                              }
                              width={"30px"}
                              alt=""
                              roundedCircle
                            />
                            <h5 className="m-1">{item}</h5>
                          </Link>
                        </div>
                      ))}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col lg={4} md={6} sm={9} className="pb-5">
                  <ListGroup className="rounded-0">
                    <ListGroup.Item>
                      <h5>followings: {data.personalInfo.following.length}</h5>
                    </ListGroup.Item>
                    <ListGroup.Item variant="dark">
                      {data.personalInfo.following.map((item, key) => (
                        <div className="textLinkStyle p-1" key={item}>
                          <Link
                            to={`/peopleProfile/${item}`}
                            className="textLinkStyle d-flex"
                          >
                            <Image
                              src={
                                data.followersProfilePic[key]
                                  ? data.followersProfilePic[key]
                                  : "data:image/png;base64,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"
                              }
                              width={"30px"}
                              alt=""
                              roundedCircle
                            />

                            <h5 className="m-1">{item}</h5>
                          </Link>
                        </div>
                      ))}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                {data.posts.map((item, key) => (
                  <Col lg={2} md={3} sm={6} xs={12} key={item._id}>
                    <Card md={10} className="rounded-0 my-1">
                      <div>
                        <Card.Img
                          src={item.post}
                          alt="posts"
                          width={"200px"}
                          className="rounded-0"
                        />
                        <Card.Body>
                          <b>likes: {item.likes.length}</b>
                          <br />
                          <div>
                            <div className="d-flex justify-content-between align-items-center">
                              <b>comments:{item.comments.length} </b>
                              <FontAwesomeIcon
                                icon={
                                  chevronToggle !== key
                                    ? faChevronDown
                                    : faChevronUp
                                }
                                onClick={() => {
                                  chevronToggle !== key
                                    ? setChevronToggle(key)
                                    : setChevronToggle(null);
                                }}
                                className="cursorPointer"
                              />
                            </div>
                            {chevronToggle === key ? (
                              <div>
                                {item.comments.map((commentItem, key) => (
                                  <div key={key}>
                                    {commentItem.commenter}:{" "}
                                    {commentItem.comment}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <h1 className="p-5">this account is private</h1>
          )}
        </Container>
      )}
    </PeopleProfileContext.Provider>
  );
}

function FollowBotton(p) {
  let [temp, setTemp] = useState(p.purpose);
  let { user } = useContext(PeopleProfileContext);
  let { token } = useContext(PeopleProfileContext);
  let { target } = useContext(PeopleProfileContext);
  let { setter } = useContext(PeopleProfileContext);

  async function follow() {
    let followResult = await axios.get(
      `http://127.0.0.1:5000/${temp}/${user}/${target}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (followResult.data.result) {
      setTemp(temp === "follow" ? "unFollow" : "follow");
      setter(temp === "follow" ? true : false);
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          follow();
        }}
        size="lg"
        className="rounded-0 w-100"
        variant={temp === "follow" ? "primary" : "dark"}
      >
        {temp}
      </Button>
    </>
  );
}

export default PeopleProfile;
