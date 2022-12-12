import React, { Component } from "react";
import classes from "./UserProfile.module.css";
import localStorageServ from "../../services/locaStorage.service";
import httpServ from "../../services/http.service";
import userImage from "../../assets/human.svg";
export default class UserProfile extends Component {
  componentDidMount() {
    httpServ.getAllUnit().then((res) => {
      let data = res.data;

      this.setState({ data: data });
    });
  }
  render() {
    let userInfor = localStorageServ.userInfor.get();
    return (
      <div className={classes.container}>
        <div className={classes.userContainer}>
          <div className={classes.userImg} style={{ backgroundImage: `url(${userImage})` }}></div>
          <div className={classes.userInfor}>
            <p className={classes.pTag}>
              <span className={classes.spanTag}>Name:</span>
              {userInfor?.fullName}
            </p>
            <p className={classes.pTag}>
              <span className={classes.spanTag}>Email:</span>
              {userInfor?.userEmail}
            </p>
            <p className={classes.pTag}>
              <span className={classes.spanTag}>Account expires:</span>
              {userInfor?.dateRemaining}
              {`${userInfor?.dateRemaining}` === 1 ? "day" : "days"}
            </p>
          </div>
        </div>
        <div className={classes.policyContainer}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>ĐIỀU KHOẢN QUY ĐỊNH HỌC TẬP </div>
            <p>Dưới đây là những điều khoản được áp dụng cho học viên của CyberEnglish.</p>
            <p>Xin hãy đọc kỹ toàn bộ điều khoản để học tập một cách có hiệu quả.</p>
          </div>
          <div className={classes.content}>
            <p className={classes.point}>Điều 1: Quy định học tập</p>
            <p>Bạn cần hoàn thành bài học Listening và Multiple Choice để được mở khóa unit tiếp theo.</p>
            <p className={classes.point}>Điều 2: Việc bảo mật thông tin </p>
            <p>
              Bạn có trách nhiệm tự mình bảo quản Tài Khoản, nếu Tài Khoản bị lộ ra ngoài dưới bất kỳ hình thức nào, CyberEnglish sẽ không
              chịu trách nhiệm về mọi tổn thất phát sinh.
            </p>
            <p className={classes.point}>Điều 3: Thời gian sử dụng tài khoản</p>
            <p>
              Tài khoản của bạn có hiệu lực 150 ngày kể từ ngày đăng ký.
              {/* {localStorageServ.userInfor.get()?.dateRemaining} */}
            </p>
            <button
              className={classes.useBtn}
              onClick={() => {
                window.open(
                  "https://www.youtube.com/watch?fbclid=IwAR0Gt7JqOEgiIS0F9F6TTkzA6LvlMFelduMs0YsA68kZmGXuXb3-TuJFD5M&v=J90UfvLZONw&feature=youtu.be",
                  "_blank"
                );
              }}
            >
              Xem hướng dẫn sử dụng trang web
            </button>
          </div>
        </div>
      </div>
    );
  }
}
