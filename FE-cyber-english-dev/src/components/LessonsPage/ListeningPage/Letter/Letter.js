import React, { Component } from "react";

import classes from "./Letter.module.css";
export default class Letter extends Component {
  state = {
    textColor: "",
    content: "",
    isFirstRender: true,
  };
  underLineRef = React.createRef();
  componentDidMount() {}
  renderLeter = () => {
    if (!this.props.isSubmit) {
      let shoudShowLetter = this.props.choosenIndexLetterArr.findIndex(
        (item) => item === this.props.indexLetter
      );
      if (shoudShowLetter !== -1) {
        return this.props.letterApi;
      }
      return " ";
    }

    return this.props.letterApi;
  };
  render() {
    let textColor;
    // let fullWidht = {
    //   flexGrow: 1,
    // };
    if (!this.props.isSubmit) {
      textColor = "#2b3647";
    } else {
      textColor =
        this.props.letterApi.toLowerCase() !==
        this.props.letter_answer?.toLowerCase()
          ? "red"
          : "green";
    }
    if (this.props.letterApi === " ") {
      if (this.underLineRef.current) {
        this.underLineRef.current.style.backgroundColor = "transparent";
      }
      // fullWidht = {
      //   // width: "100%",
      // };
    }
    return (
      <div className={classes.container}>
        {/* {this.props.} */}
        <div style={{ color: ` ${textColor}` }} className={classes.letter}>
          {this.renderLeter()}
        </div>
        <div ref={this.underLineRef} className={classes.underLine}></div>
      </div>
    );
  }
}
