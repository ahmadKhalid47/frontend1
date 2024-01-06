import axios from "axios";

async function dataGetterFunction(purpose, setData, setLoader) {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("email");
  let apiKey = process.env.REACT_APP_API_KEY;
  
  try {
    let result = await axios.get(`${apiKey}/${purpose}/${user}`, {
      headers: {
        Authorization: token,
      },
    });
    setData(result.data.result);
    setLoader(true);
  } catch (err) {
    console.log(err);
  } finally {
    setLoader(false);
  }
}

export default dataGetterFunction;
