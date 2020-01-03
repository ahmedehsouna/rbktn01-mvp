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
			this.setState({messages : [...this.state.messages , data]}, _=>{
				var s = document.getElementById("scrollable")
				s.scrollTop = s.scrollHeight

			}) 

		})
  }
	componentDidMount(){
		getMessages(`?circle=${this.props.user.circle._id}` , messages => {
			this.setState({messages} , _=>{
				var s = document.getElementById("scrollable")
				s.scrollTop = s.scrollHeight
			})
			// console.log(messages)
			
		})
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
        <div style={stylesheet.body}>
          {/* <SideBar /> */}
          <div
            style={{
							display: "flex",
              flexDirection: "column",
              background: "white",
              flex: 3,
              padding: "20px"
            }}
          >
							<nav style={stylesheet.nav}>
								<span style={{margin :  "0 700px 0 0"}}>Circle {this.props.user.circle?this.props.user.circle.name : null}</span>
								<span style={stylesheet.clickable} onClick={this.props.removeCookies}>Logout</span>
							</nav>
            <div id="scrollable" style={{ flex: 9, overflow: "scroll" }}>
              {this.state.messages.map(one => (
								<p><b>{one.user.firstname + " "+ one.user.lastname}: </b>{one.content}</p>
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