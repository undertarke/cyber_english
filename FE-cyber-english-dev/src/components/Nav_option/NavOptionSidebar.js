import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { optionLestionRoute } from "../../routes/optionLessonRoute";
import httpServ from "../../services/http.service";
import classes from "./Nav_option.module.css";
import "./Sidebar.css";
class NavOptionSidebar extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.menuDrop = React.createRef();
    this.siderBarRef = React.createRef();
    this.fix_widthRef = React.createRef();
    // this.option = React.createRef();
  }
  state = {
    isShowSidebar: true,
    isReadingPage: false,
    data: [],
  };
  unit = this.props.match?.params.id;

  componentDidMount() {
    httpServ.getAllUnit().then((res) => {
      let data = res.data;
      // console.log(res.data);
      this.setState({ data: data });
    });
    window.addEventListener("scroll", this.handleScroll);
    // console.log();
    // for (let i = 0; i < this.unit; i++) {
    //   this.state.data?.push({ id: i + 1 });
    // }
  }

  //code của Thanh => làm đỡ
  renderTitleLessons = () => {
    return this.state.data
      ?.filter((elem) => elem.isLocked)
      ?.map((item, index) => {
        if (!item.unit) return "";
        // console.log(item);
        return (
          <div key={index} className="sidebar__menu__dropdown-option">
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/lesson/unit/${item.unit}`}
            >
              Lesson {item.unit}
            </NavLink>
          </div>
        );
      });
  };

  renderLesson = () => {
    for (let i = 0; i < this.unit; i++) {}
  };

  //renderTitleLessons = () => {
  // return this.state.data.map((item,index) => { //code của Sĩ
  //   if (!item.isLocked) return "";
  //   // console.log(item);
  //   return (
  //     <div key={index} className="sidebar__menu__dropdown-option">
  //       <NavLink
  //         style={{ textDecoration: "none" }}
  //         to={`/lesson/unit/${item.unit}`}
  //       >
  //         Lesson {item.unit}: {item.title}
  //       </NavLink>
  //     </div>
  //   );
  // });
  // };

  openMenuLessons = (e) => {
    const menu = this.menuDrop.current;
    if (
      e.target.classList.contains("sidebar__menu") ||
      e.target.classList.contains("sidebar__select") ||
      e.target.classList.contains("sidebar__menu__icon")
    ) {
      menu.classList.toggle("sidebar__menu__active");
    }
    // menu.classList.add('red')
    if (e.target.classList.contains("menu__dropdown-option")) {
      // option.innerHTML = e.target.textContent;
      menu.classList.remove("menu__active");
    }
  };

  handleScroll = () => {
    let siderBarEl = this.siderBarRef.current;
    siderBarEl.classList.add(`${classes.full_view_heigh}`);
    if (siderBarEl.offsetTop <= window.scrollY) {
      siderBarEl.classList.add(`${classes.fixedCss}`);

      // siderBarEl.classList.add("fixedCss");
    }
    if (window.scrollY <= 65) {
      siderBarEl.classList.remove(`${classes.fixedCss}`);
      // siderBarEl.classList.add(`${classes.stopeTransition}`);
    }
  };

  toggleSiderbarHandler = () => {
    let fix_widthEl = this.fix_widthRef.current;
    let sideBar = this.siderBarRef.current;
    if (this.state.isShowSidebar) {
      this.setState({ isShowSidebar: false }, () => {
        sideBar.classList.add(`${classes.hide_sidebar}`);
        fix_widthEl.classList.add(`${classes.hide_fix_width}`);

        sideBar.classList.remove(`${classes.original_sidebar}`);
      });
    } else {
      this.setState({ isShowSidebar: true }, () => {
        sideBar.classList.add(`${classes.original_sidebar}`);
        sideBar.classList.remove(`${classes.hide_sidebar}`);
        fix_widthEl.classList.remove(`${classes.hide_fix_width}`);
      });
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.fix_width} ref={this.fix_widthRef}></div>
        <div className={classes.sidebar} ref={this.siderBarRef}>
          <div className={classes.toggleIcon}>
            <i
              onClick={() => {
                this.toggleSiderbarHandler();
                if (this.props.isSidebarOpenHandler) {
                  this.props.isSidebarOpenHandler();
                }
              }}
              className="fa fa-bars"
            ></i>
          </div>
          <div>
            {optionLestionRoute.map((item, index) => {
              return (
                <li key={index} className={classes.item}>
                  <NavLink
                    to={`${item.path}/${this.props.match.params.id}`}
                    className={classes.title}
                    activeClassName={classes.active}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </div>
          <div
            className={`${classes.item} ${classes.menuDrop}`}
            ref={this.menuDrop}
          >
            <div
              className="sidebar__menu"
              id="sidebar__menu-drop"
              onClick={(e) => {
                this.openMenuLessons(e);
              }}
            >
              <span ref={this.option} className="sidebar__select">
                Select an option
              </span>
              <div className="sidebar__menu__icon-box">
                <div className="sidebar__menu__icon"></div>
              </div>
            </div>
            <div className="sidebar__menu__dropdown">
              {this.renderTitleLessons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavOptionSidebar = withRouter(NavOptionSidebar);
