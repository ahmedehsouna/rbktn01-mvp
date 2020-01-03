import React from 'react';
import ReactDOM from 'react-dom';
import Logging from './logging.jsx';
import Home from "./home.jsx";
console.log(document.cookie)

function postData(route , json, callback){
    fetch(`/${route}` , {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body : JSON.stringify(json)
    }).then(res => {
        res.json().then(data => callback(data))
    })
}

function getData(route , callback){
    fetch(`/${route}`).then(res => {
        res.json().then(data => callback(data))
    })
}

class App extends React.Component{
    
    constructor(){
        super()
        this.state = {
            user : {}
        }
    }
    componentWillMount(){
        getData("user" , user => {
            console.log(user)
            this.setState({user})
        })
        
    }
    logger(data, json){
        postData(data , json, fetched =>{
            console.log(fetched)
            this.setState({user : fetched.user})
        })
    }
    logOut(){
        getData("logout" , fetched => {
            this.setState({})
        })
    }
    render(){
            return (document.cookie? <Home user={this.state.user} removeCookies={this.logOut.bind(this)}/> : <Logging logger={this.logger.bind(this)} />)
    }
}

ReactDOM.render(<App /> , document.getElementById("container"))