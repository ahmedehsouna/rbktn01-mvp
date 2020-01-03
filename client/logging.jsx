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
        return (<div style={stylesheet.model}>
           <center>
                {this.state.route == "/signup"?
                <div>
                    <p>User Name : <input className="username" type="text"/></p>
                    <p>First Name : <input className="firstname" type="text"/></p>
                    <p>Last Name : <input className="lastname" type="text"/></p>
                    <p>Password   : <input className="password" type="password"/></p>
                    <button onClick={this.submit.bind(this, "signup")}>Submit</button>
                    <p onClick={this.changeRoute.bind(this,"/login")} style={stylesheet.clickable}>Have an account already?</p>
                </div>
                
                :this.state.route == "/login"?
                <div>
                    <p  style={{marginTop : "70px"}}>User Name : <input className="username" type="text"/></p>
                    <p>Password   : <input className="password" type="password"/></p>
                    <button onClick={this.submit.bind(this, "login")}>Submit</button>
                    <p onClick={this.changeRoute.bind(this,"/signup")} style={stylesheet.clickable}>Have no account?</p>
                </div>
                :null
    }

                </center>
        </div>)

    }
}


export default logging