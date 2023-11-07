import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { settings } from "../../configs/settings";
import classes from "./FacebookLogin.module.css";
import axios from "axios";
export default class Facebook_login extends Component {
  state = {
    isLogggedIn: false,
    userID: "",
    name: "",
    email: "",
    appId: "",
  };
  componentDidMount() {
    axios
      .get("https://api.techx.edu.vn/api/cauhinh/get-faceid")
      .then((result) => {
        this.setState({ appId: result.data.content });
      })
      .catch((err) => {});
  }

  responseFacebook = (res) => {
    this.props.handleLoginFb(res);
  };

  render() {
    return (
      <div className={`${classes.fb}`}>
        <i className="fab fa-facebook-f"></i>
        {this.state.appId && (
          <FacebookLogin
            appId={this.state.appId}
            // appId="148405247271158"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
            cssClass={classes.btn}
          />
        )}
      </div>
    );
  }
}
