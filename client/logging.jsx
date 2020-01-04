import React from "react";
import stylesheet from "./styleSheet.jsx";
class logging extends React.Component{
    constructor(){
        super()
        this.state = {
            route : "/signup"
        }
    }

    changeRoute(route){
        this.setState({route})
    }
    submit(usedFor){
    var json = {
        username : document.getElementsByClassName("username")[0],
        firstname: document.getElementsByClassName("firstname")[0] ,
        lastname : document.getElementsByClassName("lastname")[0] ,
        password :document.getElementsByClassName("password")[0] 
    }
        if(usedFor == "login" && json.username.value && json.password.value){
            json.username = json.username.value
            json.password = json.password.value
            delete json.firstname
            delete json.lastname
            this.props.logger("login",json)
        }
        if(usedFor == "signup" && json.username.value && json.password.value
        && json.lastname.value && json.firstname.value){
            json.username = json.username.value
            json.firstname = json.firstname.value
            json.lastname = json.lastname.value
            json.password = json.password.value
            this.props.logger("signup", json)
        }
    }

    render(){
        return (<div id="logger" style={stylesheet.model}>
           <center>
               {/* <div style={stylesheet.logo}></div> */}
               <img src="./talkingCircles.jpg" width="250px" />
               <hr/>
                {this.state.route == "/signup"?
                <div>
                    <p>username : <input className="username" type="text"/></p>
                    <p>firstname : <input className="firstname" type="text"/></p>
                    <p>lastname : <input className="lastname" type="text"/></p>
                    <p>Password   : <input className="password" type="password"/></p>
                    <span style={stylesheet.clickable} onClick={this.submit.bind(this, "signup")}>Submit</span>
                    <p onClick={this.changeRoute.bind(this,"/login")} style={stylesheet.clickable}>Have an account already?</p>
                </div>
                
                :this.state.route == "/login"?
                <div>
                    <p  style={{marginTop : "70px"}}>username : <input className="username" type="text"/></p>
                    <p>Password   : <input className="password" type="password"/></p>
                    <span style={stylesheet.clickable} onClick={this.submit.bind(this, "login")}>Submit</span>
                    <p onClick={this.changeRoute.bind(this,"/signup")} style={stylesheet.clickable}>Have no account?</p>
                </div>
                :null
    }

                </center>
        </div>)

    }
}


export default logging