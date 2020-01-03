import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{
    
    constructor(){
        super()

    }
    
    render(){
            return <p>working</p>
    }
}

ReactDOM.render(<App /> , document.getElementById("container"))