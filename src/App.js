import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SideBar from "./Siderbar";
import Chat from "./Chat";
import { useStateValue } from "./StateProvider";

// import Pusher from "pusher-js";
import Login from "./login";
// import axio from "./axios";

function App() {
  const [{ user }, dispatch] = useStateValue();

  // useEffect(() => {
  //   axio.get("/message/snyc").then((response) => {
  //     console.log(response.data);
  //     setMessages(response.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   var pusher = new Pusher("2ccf34bdbcec981c3db0", {
  //     cluster: "ap2",
  //   });

  //   var channel = pusher.subscribe("message");
  //   channel.bind("inserted", function (data) {
  //     setMessages([...messages, data]);
  //   });
  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [messages]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <SideBar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat home={false} />
              </Route>
              <Route path="/">
                <Chat home={true} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
