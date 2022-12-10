import React, { Component } from "react";
import classes from "./HomePage.module.css";
import BackgroundBig from "../../assets/imgHomePage4.jpg";
import BackgroundSmall from "../../assets/992BG.png";
import { Link } from "react-router-dom";
import localStorageServ from "../../services/locaStorage.service";
export default class HomePage extends Component {
  state = { width: 0, backgroundImg: BackgroundBig };

  updateDemesion = () => {
    let width = window.innerWidth;
    // console.log(window.innerWidth);
    this.setState({ width: width }, () => {
      this.handleChangeBackground();
    });
  };

  componentDidMount() {
    this.setState({ width: window.innerWidth }, () => {
      this.updateDemesion();
    });
    window.addEventListener("resize", this.updateDemesion);
    this.setState({
      ...this.state,
      isLogggedIn: !!localStorageServ.accessToken.get(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDemesion);
  }

  handleChangeBackground = () => {
    // console.log(this.state.width);
    if (this.state.width < 992) {
      this.setState({ backgroundImg: BackgroundSmall });
      return;
    } else {
      this.setState({ backgroundImg: BackgroundBig });
      return;
    }
  };

  render() {
    // console.log("widht", this.state.width);
    return (
      <div style={{ backgroundImage: `url(${this.state.backgroundImg})` }} className={classes.backgroundImage}>
        <div className={classes.container}>
          <p className={classes.title}>Learning English Effectively</p>
          <button className={classes.btn_leftToRight}>
            <Link to={!!localStorageServ.accessToken ? "/lessons" : "/login"} className={classes.link}>
              Start
            </Link>
          </button>
        </div>
      </div>
    );
  }
}
