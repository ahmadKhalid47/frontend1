import React, { useState } from "react";
import RegisterationContext from "./RegisterationContext";
import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";
import signUpSubmit from "./signUpSubmitFunction";
import loginSubmit from "./loginSubmitFunction";
import { Button, Col, Container, Row } from "react-bootstrap";

function Registeration(p) {
  let [reg_toggle, setReg_toggle] = useState("login");
  let [login_email, setLogin_email] = useState("");
  let [login_pass, setLogin_pass] = useState("");
  let [sign_email, setSign_email] = useState("");
  let [sign_pass, setSign_pass] = useState("");
  let [sign_pass_match, setSign_pass_match] = useState("");
  let [sign_userName, setSign_userName] = useState("");

  let registerationContextSetter = {
    login_email,
    setLogin_email,
    login_pass,
    setLogin_pass,
    sign_email,
    setSign_email,
    sign_pass,
    setSign_pass,
    sign_pass_match,
    setSign_pass_match,
    sign_userName,
    setSign_userName,
  };

  function resetValues() {
    setLogin_email("");
    setLogin_pass("");
    setSign_email("");
    setSign_pass("");
    setSign_pass_match("");
    setSign_userName("");
  }

  function fieldsVerification() {
    if (reg_toggle === "login") {
      if (login_email.trim() === "" || login_pass.trim() === "") {
        alert("some fields are empty");
      } else {
        loginSubmit(login_email, login_pass, p.func);
        resetValues();
      }
    } else {
      if (
        sign_email.trim() === "" ||
        sign_pass.trim() === "" ||
        sign_pass_match.trim() === "" ||
        sign_userName.trim() === ""
      ) {
        alert("some fields are empty");
      } else if (sign_pass.trim().length < 8) {
        alert("your password should contain 8 or more digits");
      } else if (sign_pass === sign_pass_match) {
        signUpSubmit(
          sign_email,
          sign_pass,
          sign_userName,
          p.func,
          setSign_userName,
          resetValues
        );
      } else {
        alert("password did not matched");
      }
    }
  }

  return (
    <RegisterationContext.Provider value={registerationContextSetter}>
      <Container className="d-flex justify-content-center">
        <Col lg={6} md={8} sm={10} xs={12} className="bg-secondary py-3 my-5">
          <Row className="m-4">
            {reg_toggle === "login" ? <LoginComponent /> : <SignUpComponent />}
          </Row>
          <Row className="mx-4">
            <Col className="d-flex justify-content-between">
              <Button
                onClick={() =>
                  reg_toggle === "login"
                    ? setReg_toggle("signUp")
                    : setReg_toggle("login")
                }
              >
                {reg_toggle === "login" ? "sign up" : "login"}
              </Button>
              <Button onClick={() => fieldsVerification()}>submit</Button>
            </Col>
          </Row>
        </Col>
      </Container>
    </RegisterationContext.Provider>
  );
}

export default Registeration;
