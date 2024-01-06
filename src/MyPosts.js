import { useContext, useState } from "react";
import ProfileContext from "./ProfileContext";
import DeletePost from "./DeletePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Container, Card } from "react-bootstrap";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
function MyPosts(p) {
  let { posts } = useContext(ProfileContext);
  let [chevronToggle, setChevronToggle] = useState(null);

  return (
    <>
      <Container className="pb-5">
        <Row>
          <h4>your posts</h4>
          {posts.map((item, key) => (
            <Col xl={2} md={3} sm={6} key={key}>
              <Card className="my-1">
                <div className="d-flex justify-content-end align-items-start position-relative">
                  <Card.Img
                    src={item.post}
                    alt=""
                    width={"100%"}
                    className="rounded-bottom-0"
                  />
                  <DeletePost target={item._id} />
                </div>
                <Card.Body>
                  <div>
                    <i>{item.caption}</i>
                    <br />
                    <b>likes: {item.likes.length}</b>
                    <br />
                    <div className="d-flex justify-content-between align-items-center">
                      <b>comments:</b>
                      <FontAwesomeIcon
                        icon={
                          chevronToggle !== key ? faChevronDown : faChevronUp
                        }
                        onClick={() => {
                          chevronToggle !== key
                            ? setChevronToggle(key)
                            : setChevronToggle(null);
                        }}
                        className="cursorPointer"
                      />
                    </div>
                  </div>
                  {chevronToggle === key
                    ? item.comments.map((commentObj, key) => (
                        <div className="d-flex" key={key}>
                          <b>{commentObj.commenter}: </b>
                          {commentObj.comment}
                        </div>
                      ))
                    : null}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default MyPosts;
