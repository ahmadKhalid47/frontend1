import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MyContext from "./HomeMyContext";
import CommentsLoading from "./CommentsLoading";
import CommentsContext from "./CommentsContext";
import DisplayComments from "./DisplayComments";
import { Card } from "react-bootstrap";
function CommentsComponent(p) {
  let { token, user, postCommentdependency } = useContext(MyContext);
  let target = p.target;
  let [commentsData, setCommentsData] = useState([]);
  let [deleteButton, setdeleteButton] = useState("");
  let [deleteCommentdependency, setDeleteCommentdependency] = useState(0);
  let [Loader, setLoader] = useState(true);
  let apiKey = process.env.REACT_APP_API_KEY;

  let commentsContextSetter = {
    commentsData,
    user,
    deleteButton,
    setdeleteButton,
    deleteComment,
  };

  async function deleteComment(index) {
    await axios.delete(`${apiKey}/deleteComment/${index}/${target}`, {
      headers: {
        Authorization: token,
      },
    });
    setdeleteButton("");
    setDeleteCommentdependency(deleteCommentdependency + 1);
  }

  useEffect(() => {
    async function getComments() {
      try {
        let commmentsResult = await axios.get(
          `${apiKey}/getComments/${user}/${target}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCommentsData(commmentsResult.data.result);
        setLoader(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    }
    getComments();
  }, [
    target,
    user,
    token,
    deleteCommentdependency,
    postCommentdependency,
    apiKey,
  ]);

  return (
    <Card>
      <Card.Header>{commentsData.length} comments: </Card.Header>
      <Card.Body>
        <CommentsContext.Provider value={commentsContextSetter}>
          {Loader ? <CommentsLoading /> : <DisplayComments />}
        </CommentsContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default CommentsComponent;
