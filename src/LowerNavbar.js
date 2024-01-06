import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  faGear,
  faHome,
  faPlus,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
function LowerNavbar() {
  return (
    <>
      <Nav
        className="justify-content-around bg-dark py-2 linkStyle"
        style={{ width: "100vw", height:'7vh'}}
      >
        <Nav.Item>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} className=" linkStyle" />
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} className=" linkStyle" />
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/addPost">
            <FontAwesomeIcon icon={faPlus} className=" linkStyle" />
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className=" linkStyle" />
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/settings">
            <FontAwesomeIcon icon={faGear} className=" linkStyle" />
          </Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default LowerNavbar;
