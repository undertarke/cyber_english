import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./LessonOption.module.css";
export default class LessonOption extends Component {
  state = { width: 0 };
  id = this.props.match.params.id;
  updateDemesion = () => {
    let width = window.innerWidth;
    this.setState({ width: width }, () => {});
  };
  componentDidMount() {
    this.setState({ width: window.innerWidth }, () => {});
    window.addEventListener("resize", this.updateDemesion);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDemesion);
  }
  handleLessonOptionResponsive = () => {
    if (this.state.width < 992) {
      return (
        <div className={classes.container}>
          <div className={classes.detail_container}>
            <div className={classes.option}>
              <p>
                <NavLink
                  style={{ color: "#fbb300" }}
                  className={classes.link_style}
                  to={`/vocabularyPage/${this.id}`}
                >
                  Vocabulary Activity
                </NavLink>
              </p>
              <span className={classes.desc}>
                Unit vocabulary, definitions, and example sentences.
              </span>
              <br />
              <span className={classes.descTranslate}>
                Học từ vựng một cách dễ dàng!
              </span>
            </div>
            <div className={classes.option}>
              <p>
                <NavLink
                  to={`/readingPage/${this.id}`}
                  style={{ color: "#fbb300" }}
                  className={classes.link_style}
                >
                  Reading Activity Plus Questions
                </NavLink>
              </p>
              <span className={classes.desc}>
                Read the article as you listen along. Focus on learning the unit
                vocabulary.
              </span>
              <br />
              <span className={classes.descTranslate}>
                Cải thiện kĩ năng Reading, giúp bạn học thuộc từ vựng ở phần
                Vocabulary!
              </span>
            </div>
            <div className={classes.option}>
              <p>
                <NavLink
                  to={`/listeningPage/${this.id}`}
                  style={{ color: "#fbb300" }}
                  className={classes.link_style}
                >
                  Listening Comprehension
                </NavLink>
              </p>
              <span className={classes.desc}>
                Listen to the word and type it in
              </span>
              <br />
              <span className={classes.descTranslate}>
                Cải thiện kĩ năng Listening bằng cách nghe và ghi lại đáp án!
              </span>
            </div>
            <div className={classes.option}>
              <p>
                <NavLink
                  to={`/multipleChoicePage/${this.id}`}
                  style={{ color: "#fbb300" }}
                  className={classes.link_style}
                >
                  Multiple Choice
                </NavLink>
              </p>
              <span className={classes.desc}>
                Pick the correct answer from a list.
              </span>
              <br />
              <span className={classes.descTranslate}>
                Luyện tập thông qua danh sách câu hỏi trắc nghiệm!!
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.BigScreen}>
          <div className={classes.backDrop}>
            <div className={classes.top}> </div>
            <div className={classes.bottom}> </div>
            <div className={classes.left}> </div>
            <div className={classes.right}> </div>
          </div>
          <div
            style={{ transform: "translateY(-10%)" }}
            className={classes.course__item__container}
          >
            <NavLink
              style={{ color: "#fbb300" }}
              to={`/vocabularyPage/${this.id}`}
            >
              <div className={classes.course__item__front}>
                <div className={classes.inner}>
                  <h1>
                    Vocabulary
                    <br />
                    Practice
                  </h1>
                  <h4>
                    Practice your vocabulary
                    <br />
                    and explore the language
                  </h4>
                </div>
              </div>

              <div className={classes.course__item__back}>
                <div className={classes.inner} style={{ textAlign: "center" }}>
                  <h4>Học từ vựng một cách dễ dàng!</h4>
                </div>
              </div>
            </NavLink>
          </div>{" "}
          <div className={classes.course__item__container}>
            <NavLink
              style={{ color: "#fbb300" }}
              to={`/readingPage/${this.id}`}
            >
              <div className={classes.course__item__front}>
                <div className={classes.inner}>
                  <h1>
                    Reading
                    <br />
                    Practice
                  </h1>
                  <h4>
                    Practice your reading
                    <br />
                    and explore the language
                  </h4>
                </div>
              </div>
              <div className={classes.course__item__back}>
                <div className={classes.inner} style={{ textAlign: "center" }}>
                  <h4>
                    Cải thiện kĩ năng Reading, giúp bạn học thuộc từ vựng ở phần
                    Vocabulary!
                  </h4>
                </div>
              </div>
            </NavLink>{" "}
          </div>{" "}
          <div
            style={{ transform: "translateY(-10%)" }}
            className={classes.course__item__container}
          >
            <NavLink
              style={{ color: "#fbb300" }}
              to={`/listeningPage/${this.id}`}
            >
              <div className={classes.course__item__front}>
                <div className={classes.inner}>
                  <h1>
                    Listening
                    <br />
                    Practice
                  </h1>
                  <h4>
                    Practice your Listening
                    <br />
                    and explore the language
                  </h4>
                </div>
              </div>
              <div className={classes.course__item__back}>
                <div className={classes.inner} style={{ textAlign: "center" }}>
                  <h4>
                    Cải thiện kĩ năng Listening bằng cách nghe và ghi lại đáp
                    án!
                  </h4>
                </div>
              </div>
            </NavLink>{" "}
          </div>{" "}
          <div className={classes.course__item__container}>
            <NavLink
              style={{ color: "#fbb300" }}
              to={`/multipleChoicePage/${this.id}`}
            >
              <div className={classes.course__item__front}>
                <div className={classes.inner}>
                  <h1>
                    Multiple Choice
                    <br />
                    Practice
                  </h1>
                  <h4>
                    Practice your Multiple Choice
                    <br />
                    and explore the language
                  </h4>
                </div>
              </div>
              <div className={classes.course__item__back}>
                <div className={classes.inner} style={{ textAlign: "center" }}>
                  <h4>Luyện tập thông qua danh sách câu hỏi trắc nghiệm!</h4>
                </div>
              </div>
            </NavLink>{" "}
          </div>{" "}
        </div>
      );
    }
  };
  render() {
    return this.handleLessonOptionResponsive();
  }
}
// export default withRouter(LessonOption);
