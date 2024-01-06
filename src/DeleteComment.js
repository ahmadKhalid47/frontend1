import { useContext } from "react";
import CommentsContext from "./CommentsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

function DeleteComment(p) {
  let { setdeleteButton } = useContext(CommentsContext);
  let { deleteButton } = useContext(CommentsContext);
  let { deleteComment } = useContext(CommentsContext);
  let { index } = p;

  return deleteButton !== index ? (
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() => setdeleteButton(index)}
      className="fs-6"
    />
  ) : (
    <>
      <div>
        delete?
        <div className="fs-5 d-flex justify-content-between">
          <FontAwesomeIcon
            icon={faCheck}
            onClick={() => deleteComment(index)}
          />
          <FontAwesomeIcon icon={faXmark} onClick={() => setdeleteButton("")} />
        </div>
      </div>
    </>
  );
}

export default DeleteComment;
