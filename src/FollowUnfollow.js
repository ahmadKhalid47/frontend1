import People from "./People";
import Followers from "./Followers";
import Followings from "./Followings";
import { Row, Col, ListGroup } from "react-bootstrap";
import ProfileContext from "./ProfileContext";
import { useContext, useState } from "react";

function FollowUnfollow() {
  let { reloader, setReloader } = useContext(ProfileContext);
  let [peopleToggel, setPeopleToggel] = useState(true);
  let [followingsToggel, setFollowingsToggel] = useState(false);
  let [followersToggel, setFollowersToggel] = useState(false);

  function profileRefresherFunc() {
    setReloader(reloader + 1);
  }

  function peopleToggelFunc() {
    setPeopleToggel(true);
    setFollowingsToggel(false);
    setFollowersToggel(false);
    profileRefresherFunc();
  }

  function followingsToggelFunc() {
    setPeopleToggel(false);
    setFollowingsToggel(true);
    setFollowersToggel(false);
    profileRefresherFunc();
  }

  function followersToggelFunc() {
    setPeopleToggel(false);
    setFollowingsToggel(false);
    setFollowersToggel(true);
    profileRefresherFunc();
  }

  return (
    <div className="pb-5">
      <Row>
        <Col xl={6} l={8} md={10}>
          <ListGroup>
            <ListGroup.Item
              variant="primary"
              className="rounded-bottom-0 d-flex justify-content-around cursorPointer"
            >
              <b onClick={peopleToggelFunc}>People</b>
              <b onClick={followersToggelFunc}>Followers</b>
              <b onClick={followingsToggelFunc}>Followings</b>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {peopleToggel ? <People /> : null}
      {followingsToggel ? <Followings /> : null}
      {followersToggel ? <Followers /> : null}
    </div>
  );
}

export default FollowUnfollow;
