import React from 'react';
import stylesheet from "./styleSheet.jsx";

class SideBar extends React.Component{
    
    constructor(){
        super()

    }
    
    render(){
            return (<div style={{flexDirection : "column",background : "orange", flex : 1, margin: "10px", display: "flex"}}>
                    <p>ahmed</p>
                    <p>ahmed</p>
                    <p>ahmed</p>
                    <p>ahmed</p>
                    <p>ahmed</p>
                </div>)
    }
}

export default SideBar
