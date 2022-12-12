import React, { Component } from "react";
import classes from "./ButtonAdd.module.css";
export default class ButtonAdd extends Component {
  render() {
    return (
      <button
        className={classes.btn_add}
        onClick={() => {
          this.props.handleAddToWordlist(this.props.id);
          this.props.showAlert();
        }}
      >
        <i className="fa fa-plus"></i>
        <i className="fa fa-list"></i>
      </button>
    );
  }
}
