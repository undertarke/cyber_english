import React, { Component } from "react";
import classes from "./ReadingPage.module.css";
import ButtonTranslate from "../../Button/ButtonTranslate/ButtonTranslate";
import ButtonAdd from "../../Button/ButtonAdd/ButtonAdd";
import AudioPlayer from "../../Audio_player/Audio_player";
import Modal from "../../Modal/Modal";
import RadioButton from "../../Button/Radio_button/Radio_button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Sidebar from "../../Sidebar/Sidebar";
import Paragraph from "../../Paragraph/Paragraph";
import httpServ from "../../../services/http.service";
import { NavLink } from "react-router-dom";
let RadioQuestion = class {
  constructor(id, question, answerAPI) {
    this.id = id;
    this.question = question;
    this.answerAPI = answerAPI;
    this.answerUser = "";
  }
};

// https://stackoverflow.com/questions/13896685/html5-slider-with-onchange-function
class ReadingPage extends Component {
  constructor(props) {
    super(props);
    this.myToolTipRef = React.createRef();
  }

  state = {
    data: {
      listParagraphs: [],
      audioUrl: "",
      unitTitle: " ",
    },
    isModalOpen: false,
    isFixedCssAudio: true,
    isSidebarOpen: true,
    dataModal: "",
    selected_choice: "",
    arrQuestion: [],
    isTranslateModal: false,
    isTranslateParagraph: false,
    isShow: false, //biến cờ show đáp đán khi nhấn submit
    listAnswerUser: [], //danh sách câu trả lời của user chọn
  };

  reading_content_Ref = React.createRef();

  getSelectionHandler = (e) => {
    const selection = window.getSelection();
    let toolTip = this.myToolTipRef.current;
    if (!selection.toString().trim().length) {
      toolTip.style.display = "none";
      return;
    }
    toolTip.style.display = "block";
    toolTip.style.position = "absolute"; // fixed positioning = easy mode
    toolTip.style.top = e.pageY - 40 + "px"; // set coordinates
    toolTip.style.left = e.pageX + "px";
    setTimeout(() => {
      toolTip.style.display = "none";
    }, 7000);
  };

  handleOffTooltip = () => {
    this.myToolTipRef.current.style.display = "none";
  };

  componentDidMount = () => {
    this.getDataAPI();
    window.handleClick = this.handleClick;
    window.addEventListener("scroll", this.handleScroll);
  };

  // modal start
  getDataAPI = () => {
    httpServ.getReadingByUnit(this.props.match.params.id).then((res) => {
      // console.log("res", res);
      let arrQuestion = res.data.comprehensionQuestions;
      arrQuestion = arrQuestion.map((ques) => {
        let answerAPI = atob(ques.code);
        // console.log("answerAPI", answerAPI);
        return new RadioQuestion(ques.id, ques.questtion, answerAPI);
      });
      this.setState({ data: res.data, arrQuestion: arrQuestion }, () => {
        // console.log(this.state.arrQuestion);
      });
    });
  };

  isOpenHandler = (value) => {
    this.setState({ isModalOpen: value });
  };

  isSidebarOpenHandler = () => {
    let isOpen = this.state.isSidebarOpen;
    this.setState({ isSidebarOpen: !isOpen }, () => {});
  };

  renderInnerHtml(dataHTML) {
    return {
      __html: `${dataHTML}`,
    };
  }

  renderParagraphs = () => {
    return this.state.data.listParagraphs.map((paragraph, index) => {
      return <Paragraph paragraph={paragraph} key={index}></Paragraph>;
    });
  };

  handleClick = (item) => {
    const data = {
      vocabulary: `${item.innerHTML}`,
    };

    this.isOpenHandler(true);
    // item = item.innerHTML.toLowerCase();
    let unit = this.props.match.params.id;
    httpServ.getVocabularyDetailByText(unit, data).then((res) => {
      this.setState({ dataModal: res.data });
    });
  };

  handleScroll = () => {
    let reading_contentEl = this.reading_content_Ref.current;
    let rect = reading_contentEl.getBoundingClientRect();
    // var space = window.innerHeight - reading_contentEl.offsetTop;
    var space = window.innerHeight - rect.bottom;
    // if(space)
    if (space >= 50) {
      // this.setState({ isFixedCssAudio: false });
    } else {
      // this.setState({ isFixedCssAudio: true });
    }
  };

  handleOnSubmit = () => {
    setTimeout(() => {
      this.setState({ isShow: !this.state.isShow }, () => {
        // console.log("after submit", this.state.arrQuestion);
      });
    }, 300);
  };

  pushAnswerList = () => {
    const listAnswer = [];
    const listQuestions = this.state.data?.comprehensionQuestions; //list câu trả lời từ data

    listQuestions?.forEach((question) => {
      if (question.code === "dHJ1ZQ==")
        listAnswer.push({ answer: true, id: question.id });
      if (question.code === "ZmFsc2U=")
        listAnswer.push({ answer: false, id: question.id });
    });
    return listAnswer;
  };

  renderLayoutQuestion = () => {
    return <div className={classes.choices}>{this.renderQuestion()}</div>;
  };

  renderQuestion = () => {
    const listAnswer = this.pushAnswerList(); //answer data
    const answerUserLength = this.state.listAnswerUser?.length;
    return this.state.arrQuestion.map((question, item) => {
      const answerUser = this.state.listAnswerUser[item]; //answer user

      return (
        <div className={classes.question_box} key={item}>
          <div className={classes.question}>{question.question}</div>
          <div className={classes.choices}>
            <RadioButton
              //code Thanh
              item={item}
              answerUser={answerUser?.value === true ? answerUser : " "}
              answerList={listAnswer}
              isShow={this.state.isShow}
              answerUserLength={answerUserLength}
              //code Sĩ
              value={true}
              text={"True"}
              selected={question.answerUser}
              onChange={() => {
                this.setSelected(question.id, true);
              }}
            ></RadioButton>
            <RadioButton
              //code Thanh
              item={item}
              answerUser={answerUser?.value === false ? answerUser : " "}
              answerList={listAnswer}
              isShow={this.state.isShow}
              answerUserLength={answerUserLength}
              //code Sĩ
              value={false}
              selected={question.answerUser}
              text={"False"}
              onChange={() => {
                this.setSelected(question.id, false);
              }}
            ></RadioButton>
          </div>
        </div>
      );
    });
  };

  setSelected = (id, value) => {
    let questionArr = this.state.arrQuestion;
    let index = questionArr.findIndex((ques) => ques.id === id);
    questionArr[index].answerUser = value;
    this.setState({ arrQuestion: questionArr });

    //Update this.state.listAnswerUser câu trả lời của học viên => hàm này oke rồi
    let answerUserList = this.state.listAnswerUser;
    let indexAnswer = answerUserList?.findIndex((answer) => answer.id === id);
    if (indexAnswer !== -1) {
      //đổi value khi user chọn lại
      answerUserList[indexAnswer].value = value;
      this.setState({ listAnswerUser: answerUserList });
    } else this.state.listAnswerUser.push({ id: id, value: value });

    //sắp xếp đúng thứ tự để check => quan trọng
    answerUserList.sort(function (item_1, item_2) {
      return item_1.id - item_2.id;
    });

    // console.log(answerUserList);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.handleClick = null;
  }

  render() {
    // console.log("this.props.params.id", this.props.params.id);
    // auth check
    // if (!this.props.token) {
    //   this.props.history.push("/login");
    // }
    const unit = this.props.match?.params.id;
    return (
      <div style={{ display: "flex" }} className={classes.container}>
        <Sidebar></Sidebar>
        {/* <Circle_menu></Circle_menu> */}
        <div id="reading-page" className={classes.container_reading}>
          <div
            className={classes.reading_container}
            // onMouseLeave={this.handleOffTooltip}
          >
            <div
              className={classes.reading_content}
              ref={this.reading_content_Ref}
            >
              <p className={classes.title}>{this.state.data.unitTitle}</p>
              <div
                className={classes.reading_txt}
                onClick={this.getSelectionHandler}
              >
                {this.renderParagraphs()}
              </div>
              {/* <div className={classes.fix_height}></div> */}
              <div className={classes.audio_container}></div>
              {/* <Audio_player src={this.state.data.audioUrl} isFixedCssAudio={this.state.isFixedCssAudio}></Audio_player> */}
            </div>

            {/* <ReactAudioPlayer src={mp3Reading} autoPlay controls /> */}
            <div ref={this.myToolTipRef} style={{ display: "none" }}>
              <div className={classes.tootip_container}>
                <ButtonTranslate></ButtonTranslate>
                <ButtonAdd></ButtonAdd>
              </div>
            </div>
            {/* </div> */}
            <div className={classes.choices_container}>
              <div className={classes.title}>
                Reading Comprehension Question
              </div>
              <p style={{ fontSize: "75%", color: "red", fontWeight: 600 }}>
                ( *Vui lòng chọn đầy đủ câu trả lời! )
              </p>
              <div className={classes.question_container}>
                {this.renderLayoutQuestion()}
                {!this.state.isShow ? (
                  ""
                ) : (
                  <div className={classes.backDrop}> </div>
                )}
              </div>
              <div className={classes.centerPositon}>
                {!this.state.isShow ? (
                  <button
                    onClick={this.handleOnSubmit}
                    className={classes.btnQuestion}
                    disabled={
                      this.state.listAnswerUser?.length < 3 ? "disabled" : null
                    }
                  >
                    SUBMIT
                  </button>
                ) : (
                  <NavLink to={`/lesson/unit/${unit}`}>
                    <button className={classes.btnQuestion}>QUIT</button>
                  </NavLink>
                )}
              </div>

              <div className={classes.fix_height}></div>
            </div>
          </div>
          <AudioPlayer
            src={this.state.data.audioUrl}
            isFixedCssAudio={this.state.isFixedCssAudio}
            isSidebarOpen={this.state.isSidebarOpen}
          ></AudioPlayer>
          <Modal
            onClose={() => {
              this.isOpenHandler(false);
              this.setState({ dataModal: "" });
            }}
            onOpen={() => {
              this.isOpenHandler(true);
            }}
            open={this.state.isModalOpen}
          >
            <div className={classes.containerModal}>
              <div className={classes.btnTranslate}>
                <ButtonTranslate
                  onClick={() => {
                    let isTranslate = this.state.isTranslateModal;
                    this.setState({ isTranslateModal: !isTranslate });
                  }}
                ></ButtonTranslate>{" "}
              </div>
              <p className={classes.vocaburyModal}>
                {this.state.isTranslateModal
                  ? this.state.dataModal?.translate
                  : this.state.dataModal?.vocabulary}
              </p>
              <p className={classes.definitionModal}>
                {this.state.isTranslateModal
                  ? this.state.dataModal?.dictionaryEntryTranslate
                  : this.state.dataModal?.dictionaryEntry}
              </p>
              <p className={classes.exampleModal}>
                {this.state.isTranslateModal
                  ? this.state.dataModal?.exampleSentencesTranslate
                  : this.state.dataModal?.exampleSentences}
              </p>
            </div>
          </Modal>
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
export default connect(mapStateToProps)(withRouter(ReadingPage));
