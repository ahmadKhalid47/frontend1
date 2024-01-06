import axios from "axios";
async function verifier(passer, url) {
  let token = localStorage.getItem("token");
  let email = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "login first";
  let apiKey = process.env.REACT_APP_API_KEY;
  let result = await axios.get(`${apiKey}/${url}/${email}`, {
    headers: {
      Authorization: token,
    },
  });
  passer(result.data);
}

export default verifier;
