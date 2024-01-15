import React, { useEffect } from "react";
import Linkconditions from "./Linkconditions.js";

function App() {
  useEffect(() => {
    function checker() {
      console.log(process.env.REACT_APP_API_KEY);
    }
    checker();
  }, []);

  return (
    <>
      <Linkconditions />
    </>
  );
}

export default App;
