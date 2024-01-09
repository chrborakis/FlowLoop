import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Login from "./Login";

const App = (props) => {
    return(
        <div>
            <h1>FlowLoop</h1>
            <Login />
        </div>
    )
}

export default App; 
render(<App />, document.getElementById("app"));