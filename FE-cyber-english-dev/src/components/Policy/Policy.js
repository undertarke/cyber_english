import React, { Component } from "react";
// import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./Policy.module.css";
export default class Policy extends Component {
  state = {
    isDisableAcceptBtn: true,
  };
  render() {
    let bgColorAcceptBtn = this.state.isDisableAcceptBtn ? "#797f95" : "#1d2a57";
    return (
      <div className={classes.container}>
        <div className={classes.policyContainer}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>ĐIỀU KHOẢN QUY ĐỊNH HỌC TẬP </div>
            <p>Dưới đây là những điều khoản được áp dụng cho học viên của CyberEnglish.</p>
            <p>Xin hãy đọc kỹ toàn bộ điều khoản để học tập một cách có hiệu quả.</p>
          </div>
          <div className={classes.content}>
            <p className={classes.point}>Điều 1: Quy định học tập</p>
            <p>Bạn cần hoàn thành bài học Listening và MultipleChoice để được mở khóa unit tiếp theo.</p>
            <p className={classes.point}>Điều 2: Việc bảo mật thông tin</p>
            <p>
              Bạn có trách nhiệm tự mình bảo quản Tài Khoản, nếu Tài Khoản bị lộ ra ngoài dưới bất kỳ hình thức nào, CyberEnglish sẽ không
              chịu trách nhiệm về mọi tổn thất phát sinh.
            </p>
            <p className={classes.point}>Điều 3: Thời gian sử dụng tài khoản</p>
            <p>Tài khoản của bạn có hiệu lực 150 ngày kể từ ngày đăng ký.</p>
          </div>
          <div className={classes.confirm}>
            <button
              className={classes.useBtn}
              onClick={() => {
                window.open(
                  "https://www.youtube.com/watch?fbclid=IwAR0Gt7JqOEgiIS0F9F6TTkzA6LvlMFelduMs0YsA68kZmGXuXb3-TuJFD5M&v=J90UfvLZONw&feature=youtu.be",
                  "_blank"
                );
                this.setState({ isDisableAcceptBtn: false }, () => {
                  // console.log(this.state.isDisableAcceptBtn);
                });
              }}
            >
              Xem hướng dẫn sử dụng trang web
            </button>

            <button
              disabled={this.state.isDisableAcceptBtn}
              style={{ backgroundColor: bgColorAcceptBtn }}
              className={classes.confrimBtn}
              onClick={this.props.handleClick}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}
