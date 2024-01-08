import React from "react";
import { render } from "react-dom";
import Login from "./Login";
import axios from 'axios';

// const App = (props) => {
//     return(
//         <div>
//             <h1>FlowLoop</h1>
//             {/* <Login /> */}
//         </div>
//     )
// }


class App extends React.Component{
    state = {details:[],}

    componentDidMount(){
        let data;
        axios.get('http://127.0.0.1:8000/api/userscredential')
            .then(res => {
                data = res.data;
                this.setState({
                    details: data
                });
            })
            .catch(err=>{console.log(err)})
    }
    render(){
        return(
            <div>
                <header>Data Generated From Django</header>
                <hr></hr>
                {this.state.details.map((output,id) => (
                    <div key={id}>
                        <div>
                            <h2>{output.email}</h2>
                            <h3>{output.password}</h3>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}


export default App; 
render(<App />, document.getElementById("app"));