import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import AccountPrivacyComponent from "./AccountPrivacyComponent";
import SettingContext from "./SettingContext";
import dataGetterFunction from "./DateGetterFunction";
import Logout from "./Logout";
import { Navigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
function Settings() {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("email");
  let [data, setData] = useState([]);
  let [accountPrivacy, setAccountPrivacy] = useState("");
  let [loader, setLoader] = useState(true);
  let apiKey = process.env.REACT_APP_API_KEY;

  let settingContextSetter = {
    accountPrivacy,
    setAccountPrivacy,
  };

  useEffect(() => {
    dataGetterFunction("settings", setData, setLoader);
  }, [token, user]);

  useEffect(() => {
    if (accountPrivacy === "") {
      return;
    }
    async function accountPrivacyFunc() {
      await axios.post(
        `${apiKey}/setAccountPrivacyState/${user}`,
        { accountPrivacy },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
    accountPrivacyFunc();
  }, [accountPrivacy, token, user, apiKey]);

  useEffect(() => {
    async function accountPrivacyStateFunc() {
      let accountPrivacyResult = await axios.get(
        `${apiKey}/getAccountPrivacyState/${user}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (accountPrivacyResult.data.result !== "token error") {
        setAccountPrivacy(accountPrivacyResult.data.result);
      }
    }
    accountPrivacyStateFunc();
  }, [token, user, apiKey]);

  return (
    <SettingContext.Provider value={settingContextSetter}>
      {data === "token error" ? (
        <Navigate to={"/"} />
      ) : loader ? (
        <Loading />
      ) : (
        <div style={{ height: "90vh" }} className="bg-secondary">
          <ListGroup className="rounded-0">
            <ListGroup.Item className="bg-secondary">
              <AccountPrivacyComponent />
            </ListGroup.Item>
            <ListGroup.Item className="bg-secondary">
              <Logout />
            </ListGroup.Item>
          </ListGroup>
        </div>
      )}
    </SettingContext.Provider>
  );
}

export default Settings;
