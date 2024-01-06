import { Spinner } from "react-bootstrap";
import "./App.css";
function CommentsLoading() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" />
    </div>
  );
}

export default CommentsLoading;
