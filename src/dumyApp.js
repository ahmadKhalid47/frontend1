import React, { createContext, useContext, useState } from "react";
const CommonContext = createContext();

function App() {
  const [color, setColor] = useState("red");
  const updateColor = (newColor) => {
    setColor(newColor);
  };

  const contextValue = {
    color: color,
    updateColor: updateColor,
  };

  return (
    <CommonContext.Provider value={contextValue} >
      <div>
        <Header />
        <Main />
        <UpdateButton />
      </div>
    </CommonContext.Provider>
  );
}

// UpdateButton component
function UpdateButton() {
  const { updateColor } = useContext(CommonContext);

  return (
    <div>
      <button onClick={() => updateColor("yellow")}>Color Update</button>
      <button onClick={() => updateColor("blue")}>Color Update</button>
    </div>
  );
}

// Header component
function Header() {
  const { color } = useContext(CommonContext);

  return (
    <h1 style = {{ backgroundColor: color }}> hello this is Header</h1 >
  )
}

// Main component
function Main() {
  const { color } = useContext(CommonContext);

  return(
    <h1 style={{ backgroundColor: color }}>hello this is Main page</h1>
  )
}



export default App;
