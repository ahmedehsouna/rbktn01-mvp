import React from "react";
import stylesheet from "./styleSheet.jsx";
import openSocket from 'socket.io-client';
import SideBar from "./sidebar.jsx";

function getMessages(query, callback) {
  fetch("/messages" + query).then(res => {
    res.json().then(data => {
      callback(data);
    });
  });
}
function sendMessageToServer(json , callback) {
  fetch("/messages", {
		method : "POST",
		headers: {
				'Content-Type': 'application/json'
			},
		body : JSON.stringify(json)
}).then(res => {
    res.json().then(data => {
      callback(data);
    });
  }).catch(err => console.log(err));
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			messages: [],
			socket : openSocket("http://localhost:3000")
		};
		this.state.socket.on("message", data => {
						if(data.circle == this.props.user.circle._id){
							this.setState({messages : [...this.state.messages , data]}, _=>{
								var s = document.getElementById("scrollable")
								s.scrollTop = s.scrollHeight
				
							}) 

						}

		})
  }
	componentDidMount(){
		if(this.props.user.circle){
			getMessages(`?circle=${this.props.user.circle._id}` , messages => {
				this.setState({messages} , _=>{
					var s = document.getElementById("scrollable")
					s.scrollTop = s.scrollHeight
				})
				// console.log(messages)
				
			})

		}
		// var a = document.getElementById("scrollable")
		// a.scrollTop = a.scrollHeight
	}
	addMessage(){
		var json = {
			user : this.props.user._id,
			circle : this.props.user.circle._id,
			content : document.getElementsByTagName("input")[0].value
		}
		sendMessageToServer(json , data => {
			document.getElementsByTagName("input")[0].value = ""
			this.state.socket.emit("message" , data)
		})

	}
  render() {
    return (
      <center>
				<h1 style={{color: "white", margin : "0 0 10px 0"}}>Talking Circles</h1>
        <div style={stylesheet.body}>
          {/* <SideBar /> */}
          <div
            style={stylesheet.chat}
          >
							<nav style={stylesheet.nav}>
							<span style={{flex : 1}}>{this.props.user?this.props.user.firstname + " " + this.props.user.lastname : null}</span>
							<span style={{flex : 1}}>Circle {this.props.user.circle?this.props.user.circle.name : null}</span>
								<span style={Object.assign(stylesheet.clickable,{flex : 1})} onClick={this.props.removeCookies}>Logout</span>
							</nav>
            <div id="scrollable" style={{ flex: 9, overflow: "scroll" }}>
              {this.state.messages.map(one => (
								<div style={{opacity:0.8,color : "white", background : "darkslategrey", padding : "0.2px 8px", width: "fit-content", borderRadius : "32px" , marginBottom : "8px" }}>
									<p style={{overflowWrap: "break-word", maxWidth : "500px"}}><b>{one.user.firstname + " "+ one.user.lastname}: </b>{one.content}</p>
								</div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  alignItems: "center"
                }}
              >
                <input
                  style={{ flex: 7, height: "20px", margin: "0 15px" }}
                  type="text"
                />
                <span onClick={this.addMessage.bind(this)} style={Object.assign(stylesheet.clickable , { flex: 1, height: "20px", marginTop: "3px" })}>
                  Send
                </span>
              </div>
            </div>
          </div>
        </div>
      </center>
    );
  }
}

export default Home;
