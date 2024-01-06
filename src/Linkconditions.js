import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Registeration from "./Registeration";
import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";
import Notifications from "./Notifications";
import Search from "./Search";
import Messages from "./Messages";
import AddPost from "./AddPost";
import PeopleProfile from "./PeopleProfile";
import MessageTo from "./MessageTo";
import UpperNavBar from "./UpperNavBar";
import LowerNavbar from "./LowerNavbar";

function Linkconditions() {
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [checker, setChecker] = useState("");
  let apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    async function checker_function() {
      let result = await axios.get(`${apiKey}/token`, {
        headers: {
          Authorization: token,
        },
      });
      setChecker(result.data.result);
    }
    checker_function();
    setToken(localStorage.getItem("token"));
  }, [token, apiKey]);

  async function reciever(p) {
    let result = await axios.get(`${apiKey}/token`, {
      headers: {
        Authorization: token,
      },
    });
    setChecker(result.data.result);
    setToken(p);
  }

  return (
    <>
      <Router>
        <div
          className="backgroundColor"
          style={{ maxHeight: "fit-content", minHeight: "100vh" }}
        >
          <div
            className="position-sticky top-0"
            style={{ position: "sticky", top: "0px", zIndex: "100" }}
          >
            {checker === "ok" && token && localStorage.getItem("email") ? (
              <UpperNavBar />
            ) : null}
          </div>
          <Routes className="position-relative">
            <Route
              path="/"
              element={
                checker === "ok" && token && localStorage.getItem("email") ? (
                  <Home />
                ) : (
                  <Registeration func={reciever} />
                )
              }
            />
            <Route path="/search" element={<Search />} />
            <Route path="/addPost" element={<AddPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/peopleProfile/:target" element={<PeopleProfile />} />
            <Route path="/MessageTo/:target" element={<MessageTo />} />
            <Route path="*" element={<h1>no found</h1>} />
          </Routes>
          <div className="position-fixed bottom-0">
            {checker === "ok" && token && localStorage.getItem("email") ? (
              <LowerNavbar />
            ) : null}
          </div>
        </div>
      </Router>
    </>
  );
}

export default Linkconditions;
