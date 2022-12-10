import React, { Component } from "react";
import ButtonAdd from "../Button/ButtonAdd/ButtonAdd";
import ButtonTranslate from "../Button/ButtonTranslate/ButtonTranslate";
import classes from "./Tooltip.module.css";
export default class Tooltip extends Component {
  render() {
    return (
      <div className={classes.container}>
        <ButtonTranslate></ButtonTranslate>
        <ButtonAdd></ButtonAdd>
      </div>
    );
  }
}
