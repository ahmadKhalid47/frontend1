import axios from "axios";
async function loginSubmit(email, password, func) {
  let apiKey = process.env.REACT_APP_API_KEY;
  let result = await axios.get(
    `${apiKey}/login/${email}/${password}`
  );
  let data = result.data;
  if (data.result === "empty") {
    alert("make account first");
  } else if (data.result === "wrong password") {
    alert("wrong password");
  } else {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", email);
    func(localStorage.getItem("token"));
  }
}
export default loginSubmit;
