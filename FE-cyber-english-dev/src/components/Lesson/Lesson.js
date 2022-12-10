import React, { Component } from "react";
import classes from "./Lesson.module.css";

class LessonItem extends Component {
  state = {
    styleRandom: "",
  };
  iconRef = React.createRef();
  componentDidMount() {
    let random = Math.floor(Math.random() * 4);
    if (random % 2 === 0) {
      random = -random;
    }
    if (this.props.isLocked) {
      this.iconRef.current.style.display = "none";
    }
    this.setState({
      styleRandom: `rotate(${random}deg)`,
    });
  }

  render() {
    let cssIsLock = this.props.isLocked ? "" : `${classes.isLockCss}`;
    let colorIsLock = this.props.isLocked ? "#FF9D6F" : "#e5e5e5";
    return (
      <div className={cssIsLock} style={{ transform: this.state.styleRandom, position: "relative" }}>
        <div className={classes.item}>
          <i ref={this.iconRef} className={`fa fa-lock ${classes.lockIcon}`}></i>
          <svg className="sc-7v08c9-9 itVPGs" width="196" height="58" viewBox="0 0 196 58" xmlns="http://www.w3.org/2000/svg">
            <g id="Onboarding" fill="none" fillRule="evenodd">
              <path
                d="M0 7.316c29.064-5.713 57.327-8.08 84.788-7.1C122.55 1.561 159.621 7.547 196 18.172v39H0V7.316z"
                id="Rectangle"
                fill={colorIsLock}
              ></path>
            </g>
          </svg>
          <span>{this.props.title}</span>
          <p>Lesson {this.props.lessonsNumber}</p>
        </div>
      </div>
    );
  }
}

export default LessonItem;
