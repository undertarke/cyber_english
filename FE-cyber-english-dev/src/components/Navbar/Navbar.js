import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import { connect } from "react-redux";
import localStorageServ from "../../services/locaStorage.service";
import AxiosServ from "../../services/axios.service";
class Navbar extends Component {
  state = {
    isMenuCollapeOpen: false,
    isLoggin: localStorageServ.accessToken.get(),
  };
  iconToggleRef = React.createRef();
  navbarCollape = React.createRef();
  menu_collapse_link_containerRef = React.createRef();

  toggleNavCollapeHandler = () => {
    if (this.props.isAuthed) {
      let menu_collapse_link_container = this.menu_collapse_link_containerRef.current;
      if (this.state.isMenuCollapeOpen) {
        menu_collapse_link_container.classList.add(`${classes.h_100}`);
        menu_collapse_link_container.classList.remove(`${classes.h_0}`);
        this.setState({ isMenuCollapeOpen: false });
      } else {
        menu_collapse_link_container.classList.remove(`${classes.h_100}`);
        menu_collapse_link_container.classList.add(`${classes.h_0}`);
        this.setState({ isMenuCollapeOpen: true });
      }
    }
  };
  handleLogout = () => {
    localStorageServ.clearLocalStorage();
    AxiosServ.removeAxiosConfig();
    this.setState({ isLoggin: false });
  };
  renderIsAuthed = () => {
    // console.log("yes", localStorageServ.accessToken.get());
    // console.log("state", this.state.currentLesson);
    if (this.state.isLoggin) {
      return (
        <>
          <div className={classes.menu}>
            <NavLink className={classes.link} activeClassName={classes.active} to="/lessons">
              Lessons
            </NavLink>

            <NavLink className={classes.link} activeClassName={classes.active} to="/flashcard">
              Flashcard
            </NavLink>

            <NavLink className={classes.link} activeClassName={classes.active} to="/wordlist">
              Word List
            </NavLink>
            <NavLink className={classes.link} activeClassName={classes.active} to="/profile">
              Profile
            </NavLink>
            <NavLink className={classes.link} onClick={this.handleLogout} activeClassName={classes.active} to="/login">
              Logout
            </NavLink>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={classes.menu}>
            <NavLink onClick={this.toggleNavCollapeHandler} className={classes.link} activeClassName={classes.active} to="/login">
              Login
            </NavLink>
          </div>
        </>
      );
    }
  };
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.nav}>
          <NavLink exact to="/" className={classes.link} activeClassName={classes.active}>
            <img width={200} height={50} src="https://cybersoft.edu.vn/wp-content/uploads/2021/03/logo-cyber-nav.svg" alt="" />
          </NavLink>
          {this.renderIsAuthed()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthRedux: state.auth.isAuth,
  };
};
export default connect(mapStateToProps)(Navbar);
