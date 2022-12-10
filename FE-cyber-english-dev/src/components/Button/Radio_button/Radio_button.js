import React, { Component } from "react";
import "./Radio_button.css";

export default class RadioButton extends Component {
  render() {
    const {
      selected,
      onChange,
      text,
      value,
      isShow,
      answerList, //list answer data
      answerUser, // answer user
      item,
      answerUserLength, //list answer user length
    } = this.props;

    const showIconAnswer = () => {
      // console.log(answerList);
      // console.log(answerUser);
      if (answerUserLength >= 3 && answerUser?.id === answerList[item]?.id)
        if (answerList[item]?.answer === answerUser?.value) {
          return <div className="fa fa-check-circle"></div>;
        } else if (!answerList[item]?.answer === answerUser?.value) {
          return <div className="fa fa-times-circle"></div>;
        }
    };

    if (!isShow)
      return (
        <div
          className="modern-radio-container"
          onClick={() => {
            onChange();
          }}
        >
          <div
            className={`radio-outer-circle ${
              value !== selected && "unselected"
            }`}
          >
            <div
              className={`radio-inner-circle ${
                value !== selected && "unselected-circle"
              }`}
            />
          </div>
          <div className="helper-text">{text}</div>
        </div>
      );
    else
      return (
        <div
          className="modern-radio-container"
          onClick={() => {
            onChange();
          }}
        >
          <div
            className={`radio-outer-circle ${
              value !== selected && "unselected"
            }`}
          >
            <div
              className={`radio-inner-circle ${
                value !== selected && "unselected-circle"
              }`}
            />
          </div>
          <div className="helper-text">{text}</div>
          {showIconAnswer()}
        </div>
      );
  }
}
