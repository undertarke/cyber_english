import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { settings } from "../../configs/settings";
import classes from "./FacebookLogin.module.css";
export default class Facebook_login extends Component {
  state = {
    isLogggedIn: false,
    userID: "",
    name: "",
    email: "",
  };

  responseFacebook = (res) => {
    this.props.handleLoginFb(res);
  };

  render() {
    return (
      <div className={`${classes.fb}`}>
        <i className="fab fa-facebook-f"></i>
        <FacebookLogin
          appId={settings.faceBookAppId}
          // appId="148405247271158"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook}
          cssClass={classes.btn}
        />
      </div>
    );
  }
}
