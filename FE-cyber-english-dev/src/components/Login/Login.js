/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import classes from "./Login.module.css";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";
import AxiosServ from "../../services/axios.service";
// import { settings } from "../../configs/settings";
import Policy from "../Policy/Policy";
class Login extends Component {
  state = {
    credentials: {
      email: "",
      facebookID: "",
      facebookEmail: "",
    },
    isShowEmailLogin: false,
    isShowNotification: false,
    isShowPolicy: false,
  };
  notificationRef = React.createRef();

  handleNotification = () => {
    if (this.notificationRef.current) {
      this.notificationRef.current.classList.add(`${classes.acitve_shotification}`);
    }
  };
  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthRedux) {
      this.setState({ isShowEmailLogin: true });
    }
  }

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleLoginFb = (value) => {
    this.state.credentials.facebookID = value.id;
    this.state.credentials.facebookEmail = value.email ? value.email : "";
    this.state.credentials.email = "";
    // console.log("yes");
    this.setState({ ...this.state }, () => {
      this.handleLogin();
    });
  };
  handleTurnOffNotification = () => {
    if (this.notificationRef.current.classList.contains(`${classes.acitve_shotification}`)) {
      this.notificationRef.current.classList.remove(`${classes.acitve_shotification}`);
    }
  };

  handleLogin = () => {
    httpServ
      .login(this.state.credentials)
      .then((res) => {
        // console.log("api tra ve", res);
        if (res.data?.authKey && res.data.isFirstTimeLogin) {
          localStorageServ.accessToken.set(res.data.authKey);
          delete res.data.authKey;
          localStorageServ.userInfor.set(res.data);
          AxiosServ.getAxiosConfig(res.data.authKey);
          this.setState({ isShowPolicy: true });
        } else if (res.data?.authKey) {
          localStorageServ.accessToken.set(res.data.authKey);
          delete res.data.authKey;
          localStorageServ.userInfor.set(res.data);
          AxiosServ.getAxiosConfig(res.data.authKey);

          window.location.assign("/lessons");
        }
      })
      .catch((err) => {
        if (err && err.status && err.status === 400) {
          this.setState(
            {
              ...this.state,
              isShowEmailLogin: true,
              isShowNotification: true,
            },
            () => {
              this.handleNotification();
            }
          );
        }
      });
  };
  handleConfirm = () => {
    // console.log("hah");
    window.location.assign("/lessons");
  };
  render() {
    return (
      // <div className={classes.body}>
      //   {!this.state.isShowPolicy ? (
      //     <div className={classes.wrapper}>
      //       <div className={classes.container}>
      //         <div className={classes.col_left}>
      //           <div className={classes.login_text}>
      //             <h2 className={classes.h2Tag}>Welcome to CyberSoft</h2>
      //             <p className={classes.pTag}>
      //               Make your dream come true
      //               <br />
      //             </p>
      //           </div>
      //         </div>
      //         <div className={classes.col_right}>
      //           <div className={classes.login_form}>
      //             <h2 className={classes.h2Tag}>Login</h2>
      //             <form ref={this.formRef}>
      //               {this.state.isShowEmailLogin && !settings.production ? (
      //                 <div className={classes.loginFail}>
      //                   <p className={classes.pTag}>
      //                     <label ref={this.notificationRef} className={classes.labelTag}>
      //                       Please enter the email you registered!
      //                       <span className={classes.spanTag}>*</span>
      //                     </label>
      //                     <input
      //                       className={classes.inputTag}
      //                       onChange={this.handleChange}
      //                       type="text"
      //                       ref={this.usernameRef}
      //                       name="email"
      //                       placeholder="Email"
      //                       required
      //                     />
      //                   </p>
      //                   <p className={classes.pTag}>
      //                     <button
      //                       className={classes.btnOk}
      //                       type="button"
      //                       onClick={() => {
      //                         this.handleLogin();
      //                         this.handleTurnOffNotification();
      //                       }}
      //                     >
      //                       Ok
      //                     </button>
      //                     <button
      //                       className={classes.btnCancel}
      //                       type="button"
      //                       onClick={() => this.setState({ ...this.state, isShowEmailLogin: false })}
      //                     >
      //                       Cancel
      //                     </button>
      //                   </p>
      //                 </div>
      //               ) : (
      //                 <div>
      //                   <FacebookLogin handleLoginFb={this.handleLoginFb}></FacebookLogin>
      //                 </div>
      //               )}
      //             </form>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   ) : (
      //     <div className={classes.policyPoup}>
      //       <Policy handleClick={this.handleConfirm}></Policy>
      //     </div>
      //   )}
      // </div>
      <div className={classes.body}>
        {!this.state.isShowPolicy ? (
          <div className={classes.wrapper}>
            <div className={classes.container}>
              <div className={classes.col_left}>
                <div className={classes.login_text}>
                  <h2 className={classes.h2Tag}>Welcome to CyberSoft</h2>
                  <p className={classes.pTag}>
                    Make your dream come true
                    <br />
                  </p>
                </div>
              </div>
              <div className={classes.col_right}>
                <div className={classes.login_form}>
                  <h2 className={classes.h2Tag}>Login</h2>
                  <form ref={this.formRef}>
                    {/* {this.state.isShowEmailLogin && !settings.production ? (
                      <div className={classes.loginFail}>
                        <p className={classes.pTag}>
                          <label ref={this.notificationRef} className={classes.labelTag}>
                            Please enter the email you registered!
                            <span className={classes.spanTag}>*</span>
                          </label>
                          <input
                            className={classes.inputTag}
                            onChange={this.handleChange}
                            type="text"
                            ref={this.usernameRef}
                            name="email"
                            placeholder="Email"
                            required
                          />
                        </p>
                        <p className={classes.pTag}>
                          <button
                            className={classes.btnOk}
                            type="button"
                            onClick={() => {
                              this.handleLogin();
                              this.handleTurnOffNotification();
                            }}
                          >
                            Ok
                          </button>
                          <button
                            className={classes.btnCancel}
                            type="button"
                            onClick={() => this.setState({ ...this.state, isShowEmailLogin: false })}
                          >
                            Cancel
                          </button>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <FacebookLogin handleLoginFb={this.handleLoginFb}></FacebookLogin>
                      </div>
                    )} */}
                    {
                      <div onClick={this.handleTurnOffNotification}>
                        <FacebookLogin handleLoginFb={this.handleLoginFb}></FacebookLogin>
                      </div>
                    }
                  </form>
                  <small ref={this.notificationRef} className={`${classes.loginPageNote} ${classes.labelTag}`}>
                    <b>Lưu ý</b>: Tài khoản facebook của bạn phải là tài khoản có email khớp với email bạn đã đăng ký khóa học của trung
                    tâm!
                  </small>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.policyPoup}>
            <Policy handleClick={this.handleConfirm}></Policy>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthRedux: state.auth.isAuth,
    isShowEmailLogin: state.auth.isShowGmail,
  };
};
export default connect(mapStateToProps)(withRouter(Login));
