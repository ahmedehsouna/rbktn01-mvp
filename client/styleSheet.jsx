var stylesheet = {
  model: {
    width: "400px",
    color : "darkslategrey",
    height: "500px",
    background: "white",

    position: "absolute",
    top: "50%",
    marginTop: "-250px",
    left: "50%",
    marginLeft: "-200px"
  },

  clickable: {
    cursor: "pointer"
  },

  nav: { background: "white", height: "50px", display : "flex" },
  body: { color : "darkslategrey", display: "flex", height: "82vh", width: "72vw" },
  chat: {
    display: "flex",
    flexDirection: "column",
    background: "white",
    flex: 3,
    padding: "20px"
  },
//   logo : {
//       height : "200px",
//     background :  "url('./talkingCircles.jpg')",
//     backgroundRepeat: "no-repeat",
//     backgroundAttachment: "fixed",
//     backgroundPosition: "center",
//     backgroundSize : "contain",
//   }
};
export default stylesheet;
