import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import MyContext from "./HomeMyContext";
import axios from "axios";
function LikeComponent(p) {
  let [purpose, setPurpose] = useState(p.purpose);
  let { token, user } = useContext(MyContext);
  let target = p.target;
  let [totalLikes, setTotalLikes] = useState(p.totalLikes);
  let apiKey = process.env.REACT_APP_API_KEY;

  async function liking() {
    await axios.get(`${apiKey}/${purpose}/${user}/${target}`, {
      headers: {
        Authorization: token,
      },
    });
    purpose === "like"
      ? setTotalLikes(totalLikes + 1)
      : setTotalLikes(totalLikes - 1);
    purpose === "like" ? setPurpose("dislike") : setPurpose("like");
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <FontAwesomeIcon
        icon={purpose === "like" ? regularHeart : solidHeart}
        onClick={() => liking()}
        className="iconStyle"
      />
      <h5>{totalLikes} Like</h5>
    </div>
  );
}
export default LikeComponent;
