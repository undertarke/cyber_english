import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import NavbarToggle from "../NavbarToggle/NavbarToggle";

export default class Nav extends Component {
  state = { width: 0 };
  updateDemesion = () => {
    let width = window.innerWidth;
    this.setState({ width: width }, () => {
      // console.log(this.state.width);
    });
  };
  componentDidMount() {
    this.setState({ width: window.innerWidth }, () => {
      // console.log("update", window.innerWidth);
    });
    window.addEventListener("resize", this.updateDemesion);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDemesion);
  }
  handleNavResponsive = () => {
    // console.log(this.state.width);
    if (this.state.width < 992) {
      return <NavbarToggle></NavbarToggle>;
    } else {
      return <Navbar></Navbar>;
    }
  };
  render() {
    return <div>{this.handleNavResponsive()}</div>;
  }
}
