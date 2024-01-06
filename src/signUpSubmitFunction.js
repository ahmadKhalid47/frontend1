import axios from "axios";

async function signUpSubmit(
  email,
  password,
  userName,
  func,
  setSign_userName,
  resetValues
) {
  let apiKey = process.env.REACT_APP_API_KEY;
  let result = await axios.get(
    `${apiKey}/signUp/${email}/${password}/${userName}`
  );
  let data = result.data;
  if (data.result === "email present") {
    alert("you already have an account");
  } else if (data.result === "userName present") {
    alert("this user name is taken");
    setSign_userName("");
  } else {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", email);
    func(localStorage.getItem("token"));
    resetValues();
  }
}
export default signUpSubmit;
