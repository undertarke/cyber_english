import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import LessonItem from "../Lesson/Lesson";
import classes from "./Lessons.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";

class Lessons extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    httpServ.getAllUnit().then((res) => {
      let data = res.data;
      // set localStorage currentUnit
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i].isLocked && data[i + 1].isLocked) {
          localStorageServ.userCurrentLesson.set(data[i].unit);
          // this.props.dispatch({
          //   type: "SET_CURRENT_LESSON",
          //   payload: data[i].unit,
          // });
        }
      }
      // console.log(res.data);
      this.setState({ data: data });
    });
  }

  renderHMTL = (data) => {
    // console.log("yes", data);
    return data.map((item, index) => {
      let css = item.isLocked ? { textDecoration: "none", cursor: "pointer" } : { textDecoration: "none", pointerEvents: "none" };
      return (
        <NavLink
          key={index}
          onClick={() => {
            localStorageServ.userCurrentLesson.set(item.unit);
            // console.log("unit", localStorageServ.userCurrentLesson.get());
          }}
          style={css}
          to={`/lesson/unit/${item.unit}`}
        >
          <LessonItem
            isLocked={item.isLocked}
            key={item.unit}
            title={item.title}
            lessonsNumber={item.unit}
            onClick={() => {
              this.props.dispatch({
                type: "SET_CURRENT_LESSON",
                payload: item.unit,
              });
            }}
          />
        </NavLink>
      );
    });
  };

  componentDidUpdate() {
    if (this.props.isAuth || this.props.token) {
    }
  }

  render() {
    let userInfor = localStorageServ.userInfor.get();
    return (
      <div id="lesson-page" className={classes.background}>
        <div className={classes.container}>
          {`${userInfor?.dateRemaining}` ? (
            <>
              <div className={classes.dayExpire}>
                Days remainding: <span className={classes.spanTag}>{userInfor?.dateRemaining}</span>{" "}
                {`${localStorageServ.userInfor?.dateRemaining}` === 1 ? "day" : "days"}
              </div>
              <div className={classes.dayExpire}>
                Số ngày sử dụng còn lại: <span className={classes.spanTag}>{userInfor?.dateRemaining} </span> ngày
              </div>
            </>
          ) : (
            ""
          )}

          <div className={classes.flex}>{this.renderHMTL(this.state.data)}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthRedux: state.auth.isAuth,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(withRouter(Lessons));
