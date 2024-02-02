import { useContext } from "react";
import FollowUnfollowButton from "./FollowUnfollowButton";
import ProfileContext from "./ProfileContext";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup,Image } from "react-bootstrap";

function People() {
  let { people } = useContext(ProfileContext);
  return (
    <Row>
      <Col xl={6} l={8} md={10}>
        <ListGroup className="w-100 rounded-top-0">
          <ListGroup.Item>
            <h5>people you may know</h5>
          </ListGroup.Item>
          {people.map((item, key) => (
            <ListGroup.Item
              key={key}
              className="d-flex justify-content-between"
            >
              <Link
                to={`/peopleProfile/${item.email}`}
                className="textLinkStyle"
              >
                <div className="d-flex">
                  <Image
                    src={
                      item.profilePic
                        ? item.profilePic
                        : "data:image/png;base64,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"
                    }
                    alt=""
                    width="30px"
                    height="30px"
                    roundedCircle
                  />
                  <h4 className="px-1">{item.email}</h4>
                </div>
              </Link>
              <FollowUnfollowButton name={item.email} purpose={"following"} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
}
export default People;
