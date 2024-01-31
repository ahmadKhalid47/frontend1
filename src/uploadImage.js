import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(
      "http://localhost:5000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data.image);
    setImageUrl(response.data.image);
  };

  return (
    <div>
      <input type="file" name="image" onChange={handleImageChange} />
      <button onClick={handleUpload}>
        Upload
      </button>
      <img src={imageUrl} alt="" width={"200px"} />
    </div>
  );
}

export default App;
