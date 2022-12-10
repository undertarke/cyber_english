import React, { Component } from "react";
import NavOptionSidebar from "../Nav_option/NavOptionSidebar";

export default class Sidebar extends Component {
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
  handleSidebarReponsive = () => {
    if (this.state.width >= 992) {
      return <NavOptionSidebar></NavOptionSidebar>;
    } else {
      // return <Circle_menu></Circle_menu>;
      return;
    }
  };
  render() {
    return <div>{this.handleSidebarReponsive()}</div>;
  }
}
