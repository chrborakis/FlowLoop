import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import axios from 'axios';

const App = (props) => {
    const [details, setDetails] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/userscredential')
            .then(res => setDetails(res.data)
            ).catch(err => console.log(err));
    }, []);

    return (
        <div>
            <header>Data Generated From Django</header>
            {details.map((output, id) => (
                <div key={id}>
                    <div>
                        <h2>{output.email}</h2>
                        <h3>{output.password}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App; 
render(<App />, document.getElementById("app"));