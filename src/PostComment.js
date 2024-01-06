import { useContext } from "react";
import MyContext from "./HomeMyContext";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
function PostComment(p) {
  let {
    commentInput,
    setCommentInput,
    postCommentdependency,
    setPostCommentdependency,
    token,
    user,
    setShowCommentInput,
  } = useContext(MyContext);
  let { target } = p;
  let apiKey = process.env.REACT_APP_API_KEY;

  async function postComment() {
    if (commentInput.trim() === "") {
      return;
    }
    await axios.post(
      `${apiKey}/addComment/${user}/${target}`,
      {
        comment: commentInput,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setPostCommentdependency(postCommentdependency + 1);
    setCommentInput("");
    setShowCommentInput(false)
  }

  return (
    <div className="d-flex justify-content-center align-items-start inputStyle">
      <Form.Control
        type="text"
        value={commentInput}
        onChange={(e) => {
          setCommentInput(e.target.value);
        }}
      />
      <Button onClick={() => postComment()}>submit</Button>
    </div>
  );
}

export default PostComment;
