import { Card } from "react-bootstrap";
import LikesCountContext from "./LikeCountContext";
import { useContext } from "react";

function LikesCount() {
    let {totalLikes}=useContext(LikesCountContext)
    return (
      <Card className="w-">
        <Card.Title>
          likes:
          {totalLikes}
        </Card.Title>
      </Card>
    );
}

export default LikesCount