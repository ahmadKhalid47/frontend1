import { faBell, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap'
import "./App.css";
function UpperNavBar() {
  return (
    <Nav
    // style={{ height: "8vh" }}
      className="justify-content-between bg-dark px-5 pb-1"
    >
      <Nav.Item>
        <Link to="/" className="linkStyle">
          <h1>Instagram</h1>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <div className="d-flex pt-3">
          <Link to="/messages" className="px-4">
            <FontAwesomeIcon icon={faMessage} className="linkStyle" />
          </Link>
          <Link to="/notifications">
            <FontAwesomeIcon icon={faBell} className="linkStyle" />
          </Link>
        </div>
      </Nav.Item>
    </Nav>
  );
}
export default UpperNavBar;
