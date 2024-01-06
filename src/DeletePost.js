import { useContext, useState } from "react";
import ProfileContext from "./ProfileContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
function DeletePost(p) {
  let [deleteToggel, setDeleteToggel] = useState(false);
  let [deleteDivToggel, setDeleteDivToggel] = useState(false);
  let { setReloader } = useContext(ProfileContext);
  let { reloader } = useContext(ProfileContext);
  let { token } = useContext(ProfileContext);
  let { target } = p;
  let apiKey = process.env.REACT_APP_API_KEY;

  function trueToggel() {
    setDeleteToggel(true);
  }

  function falseToggel() {
    setDeleteToggel(false);
  }

  async function deletePost() {
    await axios.delete(`${apiKey}/deletePost/${target}`, {
      headers: {
        Authorization: token,
      },
    });
    falseToggel();
    setReloader(reloader + 1);
  }

  return (
    <div
      style={{ position: "absolute" }}
      className="w-100 h-100 rounded-top"
      onMouseEnter={() => setDeleteDivToggel(true)}
      onMouseLeave={() => setDeleteDivToggel(false)}
    >
      {deleteDivToggel ? (
        <div className="d-flex justify-content-end w-100 rounded-top">
          {!deleteToggel ? (
            <Button
              onMouseEnter={trueToggel}
              variant="danger"
              size="sm"
              className="rounded-bottom-0"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          ) : (
            <div
              onMouseLeave={falseToggel}
              className="d-flex justify-content-between w-100 bg-danger rounded-top"
            >
              <h5 className="px-2">are you sure: </h5>
              <Button
                onClick={deletePost}
                size="sm"
                className="rounded-bottom-0"
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
export default DeletePost;
