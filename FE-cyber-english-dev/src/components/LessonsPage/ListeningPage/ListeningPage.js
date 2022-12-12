import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import Letter from "./Letter/Letter";
import classes from "./ListeningPage.module.css";
import { connect } from "react-redux";
import Sidebar from "../../Sidebar/Sidebar";
import httpServ from "../../../services/http.service";
import { Alert } from "../../../utils/Alert";
import ButtonRestart from "../../Button/ButtonRestart/ButtonRestart";
class ListeningPage extends Component {
  state = {
    currentWordAPI: "",
    currentTyping: "",
    isSubmit: false,
    randomChoosenIndexArr: [],
    IndexCurrentQuestion: 0,
    currentAswerdAPI: "",
    data: {},
    alert: false,
    showSuccessReset: false,
  };

  componentDidMount() {
    this.getQuestionDataAPI();

    let randomChoosenIndex = this.state.data?.suggestion?.index;
    this.setState({ randomChoosenIndex: randomChoosenIndex });
  }
  unit = this.props.match.params.id;
  getQuestionDataAPI = () => {
    httpServ.getListeningQuestionByUnit(this.unit).then((res) => {
      this.setState({ data: res.data });
      let code = res.data.code;
      let vocabulary = atob(code);
      this.setState({ currentWordAPI: vocabulary });
      let randomArr = [];
      let lengthRandomArr = Math.floor(vocabulary.length / 5) + 1;
      let count = 0;
      while (count < lengthRandomArr) {
        let indexValue = Math.floor(Math.random() * vocabulary.length);
        if (randomArr.length === 0) {
          randomArr.push(indexValue);
          count++;
        } else {
          let index = randomArr.findIndex((item) => item === indexValue);
          if (index === -1) {
            randomArr.push(indexValue);
            count++;
          }
        }
      }
      this.setState({ randomChoosenIndexArr: randomArr });
    });
  };
  refInput = React.createRef();
  refAudioUS = React.createRef();
  refAudioUK = React.createRef();
  renderLetters = () => {
    let word = this.state.currentWordAPI.split("");

    let letters = [];
    let letter_answer = this.state.currentTyping.split("");
    for (let index = 0; index < word.length; index++) {
      letters.push(
        <Letter
          choosenIndexLetterArr={this.state.randomChoosenIndexArr}
          letter_answer={letter_answer[index]}
          indexLetter={index}
          key={index}
          letterApi={word[index]}
          isSubmit={this.state.isSubmit}
        ></Letter>
      );
    }
    return letters;
  };
  handleGetValueInput = (e) => {
    let value = e.target.value;
    this.setState({ currentTyping: value });
  };
  handleOnSubmit = () => {
    if (!this.refInput.current.value) return;
    let isSubmit = this.state.isSubmit;
    let unit = this.props.match.params.id;
    if (!isSubmit) {
      const data = {
        id: `${this.state.data?.id}`,
        answer: this.state.currentTyping,
      };

      httpServ.checkListeningQuestionByUnit(unit, data);
    } else {
      this.getQuestionDataAPI();
      this.setState({ currentWordAPI: "" });
    }
    this.setState(
      {
        isSubmit: !isSubmit,
      },
      () => {
        if (!this.state.isSubmit) {
          this.refInput.current.value = "";
        }
        if (this.state.data?.processing?.corected === this.state.data?.processing?.total) {
          this.showAlert();
        }
      }
    );
  };
  handleEnter = (e) => {
    if (e.charCode === 13) {
      this.handleOnSubmit();
    }
  };
  handlePlayUS = () => {
    this.refAudioUS.current.play();
  };
  handlePlayUK = () => {
    this.refAudioUK.current.play();
  };

  showAlert = () => {
    this.setState({ alert: true });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 5000);
  };
  handleReset = () => {
    httpServ
      .resetListeningByID(this.unit)
      .then((res) => {
        this.setState({ showSuccessReset: true }, () => {
          setTimeout(() => {
            this.getQuestionDataAPI();

            this.setState({ showSuccessReset: false });
          }, 1000);
        });
      })
      .catch((err) => {});
  };
  render() {
    return (
      <div className={classes.container}>
        <Sidebar></Sidebar>
        {Alert(this.state.alert, "You have a complete listening!")}
        <div className={classes.listening_container}>
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
            <div className={classes.audio_container}>
              <div className={classes.us} onClick={this.handlePlayUS}>
                <i className="fa fa-volume-down"></i>
                <span>US</span>
                <audio ref={this.refAudioUS} src={this.state.data?.audioUsUrl}></audio>
              </div>
              <div className={classes.uk} onClick={this.handlePlayUK}>
                <i className="fa fa-volume-down"></i>
                <span>UK</span>
                <audio ref={this.refAudioUK} src={this.state.data?.audioUkUrl}></audio>
              </div>
            </div>

            <div className={classes.word_result}>{this.renderLetters()}</div>
            <input
              ref={this.refInput}
              onKeyPress={this.handleEnter}
              placeholder="Type your answer"
              onChange={(e) => this.handleGetValueInput(e)}
              className={classes.word_input}
            ></input>
            <div className={classes.btn_cotainer}>
              <button onClick={this.handleOnSubmit} className={classes.btn} disabled={!this.state.currentTyping.length ? "disabled" : null}>
                {!this.state.isSubmit ? "SUBMIT" : "NEXT"}
              </button>
            </div>
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
export default connect(mapStateToProps)(withRouter(ListeningPage));
