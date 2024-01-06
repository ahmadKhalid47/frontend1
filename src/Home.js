import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import HomeMyContext from "./HomeMyContext";
import dataGetterFunction from "./DateGetterFunction";
import OthersPosts from "./OthersPosts";
import { Navigate } from "react-router-dom";
import "./App.css";

function Home() {
  let user = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "login first";
  let token = localStorage.getItem("token");
  let [data, setData] = useState([]);
  let [loader, setloader] = useState(true);
  let [postCommentdependency, setPostCommentdependency] = useState(0);
  let [commentInput, setCommentInput] = useState("");
  let [selectedPeople, setSelectedPeople] = useState([]);
  let [showShareList, setShowShareList] = useState(false);
  let [showCommentInput, setShowCommentInput] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    dataGetterFunction("home", setData, setloader);
  }, [token, user]);

  let HomeContextSetter = {
    user,
    token,
    data,
    postCommentdependency,
    setPostCommentdependency,
    commentInput,
    setCommentInput,
    selectedPeople,
    setSelectedPeople,
    showShareList,
    setShowShareList,
    showCommentInput,
    setShowCommentInput,
  };

  return (
    <HomeMyContext.Provider value={HomeContextSetter}>
      <div style={{ minHeight:"90vh", maxHeight:"fit-content" }}>
        {data === "token error" ? (
          <Navigate to={"/"} />
        ) : loader === true ? (
          <Loading />
        ) : (
          <OthersPosts />
        )}
      </div>
    </HomeMyContext.Provider>
  );
}

export default Home;
