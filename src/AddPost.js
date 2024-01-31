import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import dataGetterFunction from "./DateGetterFunction";
import { Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function AddPost() {
  let [data, setData] = useState([]);
  let [image, setImage] = useState("");
  let [caption, setCaption] = useState("");
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("email");
  let [loader, setLoader] = useState(true);
  let apiKey = process.env.REACT_APP_API_KEY;
  let [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {
    dataGetterFunction("addPost", setData, setLoader);
  }, [token, user]);

  async function post() {
    if (image === "" || image === null) {
      alert("Please select an Image!");
      return;
    }

    let formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    try {
      setButtonDisable(true);
      await axios.post(`${apiKey}/post/${user}`, formData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      alert(
        "this particular image cannot be uploaded, please try another image"
      );
    } finally {
      setButtonDisable(false);
    }
    setCaption("");
  }
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ minHeight: "90vh", maxHeight: "fit-content" }}
      >
        {data === "token error" ? (
          <Navigate to={"/"} />
        ) : loader === true ? (
          <Loading />
        ) : (
          <div>
            <Form.Label className="pt-4">
              <h4>Upload image</h4>
            </Form.Label>
            <div>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                className="rounded-0"
              />
            </div>
            <Form.Label className="pt-4">
              <h4>Caption</h4>
            </Form.Label>
            <div className="d-flex rounded-0">
              <Form.Control
                type="text"
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="rounded-0"
              />
              <Button
                disabled={buttonDisable}
                variant="success rounded-0"
                onClick={() => post()}
              >
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddPost;
