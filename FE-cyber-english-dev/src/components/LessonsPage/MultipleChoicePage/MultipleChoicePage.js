import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import RadioButton from "../../Button/Radio_button/Radio_button";
import classes from "./MultipleChoicePage.module.css";
import { connect } from "react-redux";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import Sidebar from "../../Sidebar/Sidebar";
import httpServ from "../../../services/http.service";
import { Alert } from "../../../utils/Alert";
import ButtonRestart from "../../Button/ButtonRestart/ButtonRestart";

class MultipleChoicePage extends Component {
  unit = this.props.match.params.id;
  state = {
    currentQuestion: {
      question: "crash",
      choices: [
        {
          content: "a rule or law which limits or controls access to something",
          isTrue: false,
        },
        {
          content:
            "an application normally consisting of a source code editor, a compiler and/or interpreter, build-automation tools, and a debugger",
          isTrue: false,
        },
        {
          content: "a computer failure which aborts an application or freezes an operating system",
          isTrue: true,
        },
      ],
    },
    selected_choice: "",
    selected_choice_isTrue: "", // check true / fasle of the answer
    isSubmit: false,
    IndexCurrentQuestion: 0,
    totalQuestions: 3, //  progress bar
    totalCorrectQuestions: 0,
    data: {
      answerList: [],
      processing: {
        answered: 0,
        total: 0,
        corected: 0,
      },
    },
    paramsId: "",
    isGetResponse: false,
    alert: false,
  };

  componentDidMount = () => {
    this.getQuestionDataAPI();
    this.setState({ paramsId: this.props.match.params.id });
  };

  getQuestionDataAPI = () => {
    httpServ.getMutipleChoiceByUnit(this.unit).then((res) => {
      // console.log("new", res);
      this.setState({ data: res.data, isGetResponse: false }, () => {});
    });
  };

  overlayRef = React.createRef();

  getTrueChoice_CurrentQuestion = () => {
    let choices = this.state.currentQuestion.choices;
    for (let i = 0; i < choices.length; i++) {
      if (choices[i].isTrue) return choices[i].content;
    }
  };

  setSelected = (value, isTrue) => {
    this.setState({ selected_choice: value, selected_choice_isTrue: isTrue });
  };

  renderChoices = () => {
    let choices = this.state.data?.answerList;
    return choices?.map((choice, index) => {
      return (
        <div className="choice_txt" key={index}>
          <RadioButton
            key={index}
            value={choice}
            selected={this.state.selected_choice}
            text={capitalizeFirstLetter(choice)}
            onChange={() => {
              this.setSelected(choice, choice.isTrue);
            }}
          />
        </div>
      );
    });
  };

  setBackGroundNotification = () => {
    if (this.state.isSubmit && this.state.isGetResponse) {
      if (this.state.selected_choice_isTrue && this.state.isGetResponse) return "#b8f28b";
      return "#ffc1c1";
    }
    return "#ffffff";
  };

  handleSubmit = () => {
    // console.log("yes");

    if (!this.state.selected_choice) return;
    this.setState(
      {
        isSubmit: true,
      },
      () => {
        if (this.state.data?.processing?.corected === this.state.data?.processing?.total) {
          this.showAlert();
        }
      }
    );
    let { id, vocabulary } = this.state.data;

    let answer = this.state.selected_choice;

    const data = {
      id,
      vocabulary,
      answer,
    };
    httpServ.checkMutipleChoice(this.unit, data).then((res) => {
      this.setState({
        selected_choice_isTrue: res.data.isExact,
        isGetResponse: true,
      });
    });

    if (this.state.selected_choice_isTrue) {
      let current = this.state.totalCorrectQuestions;
      this.setState({ totalCorrectQuestions: current + 1 }, () => {});
    }
    this.overlayRef.current.style.display = "block";
  };

  handleNextQuestion = () => {
    this.getQuestionDataAPI();
    //
    let index = this.state.IndexCurrentQuestion;
    if (index === this.state.totalQuestions) {
      this.props.history.push("/lesson");
      return;
    }
    //
    this.setState({
      selected_choice: "",
      isSubmit: false,
      selected_choice_isTrue: false,
    });
    this.overlayRef.current.style.display = "none";
  };

  showAlert = () => {
    this.setState({ alert: true });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 5000);
  };
  handleReset = () => {
    httpServ
      .resetMultipleChoiceByID(this.unit)
      .then((res) => {
        // this.getQuestionDataAPI();
        // console.log("reset", res);
        this.setState({ showSuccessReset: true }, () => {
          setTimeout(() => {
            this.getQuestionDataAPI();

            this.setState({ showSuccessReset: false });
          }, 1000);
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  render() {
    let id = this.props.match.params.id;
    let show_notification_HTML = () => {
      if (!this.state.isSubmit || !this.state.isGetResponse) {
        return (
          <div className={classes.choice_btn_container}>
            <button onClick={this.handleSubmit} className={`${classes.btn} ${classes.a}`}>
              SUBMIT
            </button>

            <NavLink
              style={{
                color: "#000000",
                textDecoration: "none",
              }}
              to={`/lesson/unit/${id}`}
            >
              <button className={`${classes.btn} ${classes.a}`}>QUIT</button>
            </NavLink>
          </div>
        );
      } else {
        if (this.state.selected_choice_isTrue && this.state.isGetResponse) {
          return (
            <div className={classes.choice_btn_container_success}>
              <div className={classes.excellent}>
                <i className="fa fa-check"></i>
                <span>Excellent! </span>
              </div>
              <button onClick={this.handleNextQuestion} className={`${classes.btn} ${classes.next}`}>
                {this.state.totalQuestions === this.state.IndexCurrentQuestion ? "QUITE" : "NEXT"}
              </button>
            </div>
          );
        } else {
          return (
            <div className={classes.choice_btn_container_fail}>
              <div className={classes.incorrect}>
                <i className="fa fa-times"></i>
                <div>
                  <span>Incorrect! </span>
                  <p></p>
                </div>
              </div>
              <button onClick={this.handleNextQuestion} className={`${classes.btn} ${classes.next}`}>
                {this.state.totalQuestions === this.state.IndexCurrentQuestion ? "QUITE" : "NEXT"}
              </button>
            </div>
          );
        }
      }
    };
    let bg_notification = this.setBackGroundNotification();

    return (
      <div style={{ display: "flex" }} className={classes.multiple_container}>
        <div className={classes.sidebar}>
          <Sidebar></Sidebar>
        </div>
        {Alert(this.state.alert, "You have a complete multiple choice!")}
        <div className={classes.container}>
          <div className={classes.progress_line}>
            <div
              className={classes.progress_line_correct}
              style={{
                width: Math.floor((this.state.data?.processing?.corected / this.state.data?.processing?.total) * 100) + "%",
              }}
            ></div>
            <div className={classes.showStatic_container}>
              <ButtonRestart handleReset={this.handleReset} showSuccessReset={this.state.showSuccessReset}></ButtonRestart>

              <div className={classes.showStatic}>
                <p>
                  {this.state.data?.processing?.corected} of {this.state.data?.processing?.total}
                </p>
                <p>
                  {this.state.data?.processing?.corected === 0
                    ? "0"
                    : Math.floor((this.state.data?.processing?.corected / this.state.data?.processing?.answered) * 100)}
                  % correct so far
                </p>
              </div>
            </div>
          </div>
          <div className={classes.question_box}>
            <div className={classes.question}>{this.state.data?.vocabulary && capitalizeFirstLetter(this.state.data?.vocabulary)}</div>
            <div className={classes.choices}>{this.renderChoices()}</div>
            <div ref={this.overlayRef} className={classes.overlay}></div>
          </div>
          <div
            className={classes.show__notification_container}
            style={{
              backgroundColor: bg_notification,
            }}
          >
            <div className={classes.show__notification}>{show_notification_HTML()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)((MultipleChoicePage = withRouter(MultipleChoicePage)));
