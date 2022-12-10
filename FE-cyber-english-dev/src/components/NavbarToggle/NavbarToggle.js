import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavbarToggle.module.css";
import { connect } from "react-redux";
import { optionLestionRoute } from "../../routes/optionLessonRoute";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { changePosition } from "../../utils/helpers";
import localStorageServ from "../../services/locaStorage.service";
import AxiosServ from "../../services/axios.service";
class NavbarToggle extends Component {
  state = {
    isMenuCollapeOpen: false,
    isCroll: true,
    currentLesson: localStorageServ.userCurrentLesson.get(),
  };
  iconToggleRef = React.createRef();
  navbarCollape = React.createRef();
  menu_collapse_link_containerRef = React.createRef();
  containerToggle_menuActivityRef = React.createRef();
  handleLogout = () => {
    // console.log("delete");
    // this.props.dispatch({ type: "SET_TOKEN", payload: "" });
    // this.props.dispatch({ type: "IS_AUTH", payload: false }); // localStorage.removeItem("token");

    localStorageServ.clearLocalStorage();
    AxiosServ.removeAxiosConfig();
  };
  handleToggle = () => {
    this.iconToggleRef.current.click();
  };
  handleToggle_menuActivity = () => {
    if (this.containerToggle_menuActivityRef.current.classList.contains(`${classes.acitve_menu_acitity}`)) {
      this.containerToggle_menuActivityRef.current.classList.remove(`${classes.acitve_menu_acitity}`);
      // console.log("deleted");
    } else {
      this.containerToggle_menuActivityRef.current.classList.add(`${classes.acitve_menu_acitity}`);
    }
  };
  handleCloseActivityMenu = () => {
    if (this.containerToggle_menuActivityRef.current.classList.contains(`${classes.acitve_menu_acitity}`)) {
      this.containerToggle_menuActivityRef.current.classList.remove(`${classes.acitve_menu_acitity}`);
      // console.log("deleted");
    }
  };
  handleChangePosition() {
    // console.log(this.state.isCroll);
    this.state.isCroll ? this.setState({ isCroll: false }) : this.setState({ isCroll: true });
    changePosition(this.state.isCroll);
  }

  renderIsAuthed = () => {
    let userInfor = localStorageServ.userInfor.get();

    // console.log("yes", localStorageServ.userCurrentLesson.get());
    // console.log("yes", this.state.currentLesson);
    if (localStorageServ.accessToken.get()) {
      return (
        <div className={classes.mobie_container}>
          <div className={classes.nav_menu_collapse}>
            <input type="checkbox" className={classes.toggle_btn} id="hamberger1" />
            <label
              ref={this.iconToggleRef}
              className={classes.toggle_btn_label}
              htmlFor="hamberger1"
              onClick={() => {
                this.handleChangePosition();
                this.handleCloseActivityMenu();
              }}
            ></label>
            <ul className={classes.nav_links}>
              <li style={{ transitionDelay: "0s" }} className={classes.link_wa}>
                <NavLink className={classes.link} activeClassName={classes.active} to="/lessons" onClick={this.handleToggle}>
                  Lessons
                </NavLink>
              </li>
              <li style={{ transitionDelay: "0s" }} className={classes.link_wa}>
                {" "}
                <NavLink className={classes.link} activeClassName={classes.active} onClick={this.handleToggle} to="/flashcard">
                  Flashcard
                </NavLink>
              </li>
              <li style={{ transitionDelay: "0.0s" }} className={classes.link_wa}>
                <NavLink className={classes.link} activeClassName={classes.active} onClick={this.handleToggle} to="/wordlist">
                  Word List
                </NavLink>
              </li>
              <div
                ref={this.containerToggle_menuActivityRef}
                style={{ transitionDelay: "0.0s" }}
                className={`${classes.link_wrapper} ${classes.menu_activity_container}`}
              >
                <div className={`${classes.menu_toggle} ${classes.flex_center}`} onClick={this.handleToggle_menuActivity}>
                  <span>Activity</span>
                  <i className={`${classes.btn_menu_activity} fa fa-angle-down `}></i>
                </div>
                <div className={classes.menu_activity}>
                  {optionLestionRoute.map((item, index) => {
                    return (
                      <li key={index} className={classes.item}>
                        <NavLink
                          to={`${item.path}/${localStorageServ.userCurrentLesson.get()}`}
                          className={classes.link}
                          // activeClassName={classes.active}
                          onClick={this.handleToggle}
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    );
                  })}
                </div>
              </div>
              <li style={{ transitionDelay: "0.0s" }} className={classes.link_wa}>
                {" "}
                <NavLink
                  className={classes.link}
                  activeClassName={classes.active}
                  onClick={() => {
                    this.handleToggle();
                  }}
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
              <li style={{ transitionDelay: "0.0s" }} className={`${classes.link} ${classes.dayRemainding_container}`}>
                {`${userInfor?.dateRemaining}` ? (
                  <>
                    <div className={classes.dayExpire}>
                      Days remainding:{" "}
                      <span className={classes.spanTag}>
                        {userInfor?.dateRemaining} {`${localStorageServ.userInfor?.dateRemaining}` === 1 ? "day" : "days"}
                      </span>
                    </div>
                    <div className={classes.dayExpireVn}>
                      Số ngày sử dụng còn lại: <span className={classes.spanTag}>{userInfor?.dateRemaining} ngày</span>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </li>
              <li>
                <NavLink
                  className={classes.link}
                  activeClassName={classes.active}
                  onClick={() => {
                    this.handleToggle();
                    this.handleLogout();
                  }}
                  to="/login"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
            {/* </div> */}
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.mobie_container}>
          <div className={classes.nav_menu_collapse}>
            <label
              ref={this.iconToggleRef}
              className={classes.toggle_btn_label}
              htmlFor="hamberger1"
              onClick={() => this.handleChangePosition()}
            ></label>
            <input type="checkbox" className={classes.toggle_btn} id="hamberger1" />
            <ul className={classes.nav_links}>
              <li style={{ transitionDelay: "0.0s" }} className={classes.link_wa}>
                {" "}
                <NavLink className={classes.link} activeClassName={classes.active} onClick={this.handleToggle} to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  };
  render() {
    return (
      <div className={classes.container}>
        <NavLink exact to="/" className={classes.link} activeClassName={classes.active}>
          <img width={200} height={50} src="https://cybersoft.edu.vn/wp-content/uploads/2021/03/logo-cyber-nav.svg" alt="" />
        </NavLink>
        {this.renderIsAuthed()}
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
export default connect(mapStateToProps)(withRouter(NavbarToggle));
