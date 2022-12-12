import React, { Component } from "react";
import classes from "./ButtonRestart.module.css";
class ButtonRestart extends Component {
  state = {
    showSuccess: false,
  };
  handleShowSucess = () => {
    this.props.handleReset();
  };

  render() {
    let style = this.props.showSuccessReset ? `${classes.btn_restart} ${classes.success}` : classes.btn_restart;
    return (
      <button className={style} onClick={this.handleShowSucess}>
        <span className={classes.spanTag}>reset</span>
        <div className={classes.icon}>
          <i className={`${classes.restart} fa fa-undo`}></i>
          <i className={`${classes.check} fa fa-check`}></i>
        </div>
      </button>
    );
  }
}

export default ButtonRestart;
