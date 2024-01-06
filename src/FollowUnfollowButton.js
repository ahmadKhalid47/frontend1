import React, { useContext, useState } from "react";
import ProfileContext from "./ProfileContext";
import axios from "axios";
import { Button } from "react-bootstrap";

function FollowUnfollowButton(p) {
  let [purpose, setPurpose] = useState(p.purpose);
  let { user } = useContext(ProfileContext);
  let { token } = useContext(ProfileContext);
  let apiKey = process.env.REACT_APP_API_KEY;

  async function follow(target) {
    let followResult = await axios.get(
      `${apiKey}/${
        purpose === "follow" ? "unFollow" : "follow"
      }/${user}/${target}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (followResult.data.result) {
      setPurpose(purpose === "follow" ? "following" : "follow");
    }
  }

  return (
    <Button
      variant={purpose === "follow" ? "secondary" : "primary"}
      onClick={() => {
        follow(p.name);
      }}
    >
      {purpose === "follow" ? "unFollow" : "follow"}
    </Button>
  );
}

export default FollowUnfollowButton;
