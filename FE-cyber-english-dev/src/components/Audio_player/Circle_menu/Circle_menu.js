import React, { Component } from "react";
import classes from "./Circle_menu.module.css";
// import { optionLestionRoute } from "../../routes/optionLessonRoute";
import { NavLink } from "react-router-dom";
export default class Circle_menu extends Component {
  toggleMenuRef = React.createRef();
  state = {
    toggleMenu: false,
  };
  toggleMenuHandler = () => {
    this.toggleMenuRef.current.classList.toggle(`${classes.active}`);
    let currentState = this.state.toggleMenu;
    this.setState({ toggleMenu: !currentState });
  };
  render() {
    return (
      <div id="circularMenu" className={classes.circular_menu}>
        <div ref={this.toggleMenuRef}>
          <a onClick={this.toggleMenuHandler} className={classes.floating_btn}>
            <i className="fa fa-bars"></i>
          </a>

          <menu className={classes.items_wrapper}>
            <span href="#" className={classes.menu_item}>
              <NavLink
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
                to="/vocabularyPage"
              >
                V
              </NavLink>
            </span>
            <span href="#" className={classes.menu_item}>
              <NavLink
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
                to="/readingPage"
              >
                R
              </NavLink>
            </span>
            <span href="#" className={classes.menu_item}>
              <NavLink
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
                to="listeningPage"
              >
                L
              </NavLink>
            </span>
            <span href="#" className={classes.menu_item}>
              <NavLink
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
                to="/multipleChoicePage"
              >
                M
              </NavLink>
            </span>
          </menu>
        </div>
      </div>
    );
  }
}
