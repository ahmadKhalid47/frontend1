import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import MyPosts from "./MyPosts";
import ProfileContext from "./ProfileContext";
import PersonalInfo from "./PersonalInfo";
import FollowUnfollow from "./FollowUnfollow";
import dataGetterFunction from "./DateGetterFunction";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
function Profile() {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("email");
  let [reloader, setReloader] = useState(0);
  let [data, setData] = useState([]);
  let [loader, setLoader] = useState(true);

  useEffect(() => {
    dataGetterFunction("profile", setData, setLoader);
  }, [token, user, reloader]);

  if (data) {
    var contexSetter = {
      user,
      token,
      reloader,
      setReloader,
      loader,
      setLoader,
      ...data,
    };
  }

  return (
    <ProfileContext.Provider value={contexSetter}>
      {data === "token error" ? (
        <Navigate to={"/"} />
      ) : loader ? (
        <Loading />
      ) : (
        <>
          <Container
            fluid="sm"
            style={{ minHeight: "90vh", maxHeight: "fit-content" }}
          >
            <PersonalInfo />
            <FollowUnfollow />
            <MyPosts />
          </Container>
        </>
      )}
    </ProfileContext.Provider>
  );
}

export default Profile;
