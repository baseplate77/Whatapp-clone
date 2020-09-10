import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import "./login.css";
import firebase from "firebase";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    // auth
    //   .signInWithPopup(provider)
    // .then((result) => {
    //   if (result.credential) {
    //     var token = result.credential.accessToken;
    //   }
    //   var user = result.user;
    //   dispatch({
    //     type: "SET_USER",
    //     user: user,
    //   });
    //   console.log(user);
    // })
    // .catch((err) => {
    //   alert(err.message);
    // });

    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => auth.signInWithPopup(provider))
      .then((result) => {
        if (result.credential) {
          var token = result.credential.accessToken;
        }
        var user = result.user;
        dispatch({
          type: "SET_USER",
          user: user,
        });
        console.log(user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"></img>
        <h2>Sing in to Whatapp-Clone</h2>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
