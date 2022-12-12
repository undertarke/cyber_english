import React, { Component } from "react";
import icon_vietnamese from "../../../assets/VnFlag.png";
import icon_english from "../../../assets/englishFlag.png";
import classes from "./ButtonTranslate.module.css";
export default class ButtonTranslate extends Component {
  state = {
    icon: icon_vietnamese,
  };
  toggleIcon = () => {
    if (this.state.icon === icon_vietnamese) {
      this.setState({ icon: icon_english });
      return;
    } else {
      this.setState({ icon: icon_vietnamese });
    }
  };
  render() {
    return (
      <button
        style={{ backgroundImage: `url(${this.state.icon})` }}
        className={classes.btn_translate}
        onClick={() => {
          this.props.onClick();
          this.toggleIcon();
        }}
      ></button>
    );
  }
}
