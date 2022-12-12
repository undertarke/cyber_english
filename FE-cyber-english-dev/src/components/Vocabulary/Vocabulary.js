import React, { Component } from "react";
import ButtonAdd from "../Button/ButtonAdd/ButtonAdd";
import ButtonTranslate from "../Button/ButtonTranslate/ButtonTranslate";
import classes from "./Vocabulary.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { capitalizeFirstLetter } from "../../utils/helpers";
import httpServ from "../../services/http.service";
import { Alert } from "../../utils/Alert";

class Vocabulary extends Component {
  state = {
    isTranslate: false,
    alert: false,
  };
  // audio = new Audio();
  // test

  btnAudioRef = React.createRef();
  txt_translate_wrapperRef = React.createRef();
  line_spellingRef = React.createRef();
  txt_translateRef = React.createRef();
  componentDidMount() {
    let txt_translate_wrapperHeight = this.txt_translate_wrapperRef?.current?.clientHeight;
    let txt_translateHeight = this.txt_translateRef?.current?.clientHeight;
    // console.log(txt_translate_wrapperHeight, txt_translateHeight);
    if (txt_translate_wrapperHeight > txt_translateHeight) this.line_spellingRef.current.style.display = "none";
  }
  showDefinitionHandle = () => {
    let isTranslate = this.state.isTranslate;
    this.setState({ isTranslate: !isTranslate });
  };
  //handleAudio = (e) => {
  //   this.audio.src = e.target.getAttribute("data-src-audio");
  //   this.audio.play();
  // };

  handleAddToWordlist = (id) => {
    httpServ.addWordList({
      vocabulary_id: id,
    });
  };

  showAlerts = () => {
    this.setState({ alert: true });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 3000);
  };

  render() {
    // let txt_translate_wrapperHeight = this.txt_translate_wrapperRef?.current?.clientHeight;
    // let txt_translateHeight = this.txt_translate_wrapperRef?.current?.clientHeight;
    // console.log(txt_translate_wrapperHeight, txt_translateHeight);
    let isTranslate = this.state.isTranslate;
    let toggleCss_txt_Translate = isTranslate ? classes.show_txt_translate : classes.showOff_txt_translate;
    return (
      <>
        {Alert(this.state.alert, "Successfully added to word list!")}
        <div className={classes.container}>
          <div className={classes.definition_container}>
            <div className={classes.btn_container}>
              <button className={`${classes.male} ${classes.btn}`}>
                <i
                  ref={this.btnAudioRef}
                  onClick={this.props.handleAudio}
                  data-src-audio={this.props.word.audioDictionaryUS}
                  className="fas fa-volume-up"
                ></i>
                <i className="fa fa-male"></i>
              </button>
              <button className={`${classes.female} ${classes.btn}`}>
                <i
                  className="fas fa-volume-up"
                  ref={this.btnAudioRef}
                  onClick={this.props.handleAudio}
                  data-src-audio={this.props.word.audioDictionaryUK}
                ></i>
                <i className="fa fa-female"></i>
              </button>
            </div>
            <div className={classes.txt_vocabulary}>
              <div className={classes.txt_translate_wrapper} ref={this.txt_translate_wrapperRef}>
                <p ref={this.txt_translateRef}>{capitalizeFirstLetter(this.props.word?.vocabulary)}</p>
                <p className={classes.line_spelling} ref={this.line_spellingRef}>
                  -
                </p>
                <span className={`${classes.txt_spelling}`}>{this.props.word.spelling}</span>{" "}
              </div>

              <p className={`${classes.txt_translate} ${toggleCss_txt_Translate}`}>{capitalizeFirstLetter(this.props.word?.translate)}</p>

              {/* {this.state.data?.vocabulary} */}
            </div>
            {/* <span className={`${classes.txtTrasnlateVoc} ${this.state.isTranslate ? "show" : " "}`}>lập trình viên</span> */}
            <div className={classes.addList_line}>
              <ButtonAdd
                handleAddToWordlist={() => {
                  this.handleAddToWordlist(this.props.word.id);
                }}
                id={this.props.word.id}
                showAlert={this.showAlerts}
              ></ButtonAdd>
            </div>
            <div className={classes.txt_definition}>
              <p>{this.props.word.dictionaryEntry}</p>
              <p className={`${classes.txt_translate} ${toggleCss_txt_Translate}`}>
                {capitalizeFirstLetter(this.props.word?.dictionaryEntryTranslate)}
              </p>
            </div>
            <div className={classes.translate_container}>
              <div className={classes.btn_translate}>
                <ButtonTranslate onClick={this.showDefinitionHandle}></ButtonTranslate>
              </div>
            </div>
          </div>
          <div className={classes.example_contaier}>
            <div className={classes.btn_container}>
              <button className={`${classes.male} ${classes.btn}`}>
                <i
                  ref={this.btnAudioRef}
                  onClick={this.props.handleAudio}
                  data-src-audio={this.props.word.audioExampleSentencesUS}
                  className="fas fa-volume-up"
                ></i>
                <i className="fa fa-male"></i>
              </button>
              <button className={`${classes.female} ${classes.btn}`}>
                <i
                  ref={this.btnAudioRef}
                  onClick={this.props.handleAudio}
                  data-src-audio={this.props.word.audioExampleSentencesUK}
                  className="fas fa-volume-up"
                ></i>
                <i className="fa fa-female"></i>
              </button>
            </div>
            <div className={classes.txt_example}>
              <p>{capitalizeFirstLetter(this.props.word.exampleSentences)}</p>
              <p className={`${classes.txt_translate} ${toggleCss_txt_Translate}`}>
                {capitalizeFirstLetter(this.props.word?.exampleSentencesTranslate)}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthRedux: state.auth.isAuthRedux,
  };
};
export default connect(mapStateToProps)(withRouter(Vocabulary));
