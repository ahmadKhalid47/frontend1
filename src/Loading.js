import { Spinner } from "react-bootstrap";
import "./App.css";
function Loading() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh", width: "100vw" }}
    >
      <Spinner animation="border" style={{ width: "20vw", height: "20vw" }} />
    </div>
  );
}

export default Loading;
