import { useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

function Logout() {
  let [sureToggle, setSureToggle] = useState(false);
  function logout() {
    localStorage.clear();
    falseToggle();
  }

  if (!localStorage.getItem("email")) {
    return <Navigate to="/" />;
  }

  function trueToggle() {
    setSureToggle(true);
  }
  function falseToggle() {
    setSureToggle(false);
  }

  return (
    <>
      {sureToggle === true ? (
        <div className="d-flex">
          <Button size="sm" onClick={logout} variant="primary rounded-end-0">
            yes
          </Button>
          <Button
            size="sm"
            onClick={falseToggle}
            variant="danger rounded-start-0"
          >
            no
          </Button>
        </div>
      ) : (
        <Button size="sm" onClick={trueToggle} variant="success">
          logout
        </Button>
      )}
    </>
  );
}
export default Logout;
