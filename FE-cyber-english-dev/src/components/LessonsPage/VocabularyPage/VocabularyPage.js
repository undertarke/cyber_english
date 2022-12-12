import React, { Component } from "react";
import Vocabulary from "../../Vocabulary/Vocabulary";
import classes from "./VocabularyPage.module.css";
import Sidebar from "../../Sidebar/Sidebar";
import httpServ from "../../../services/http.service";

export default class VocabularyPage extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.getDataAPI();
  }
  audio = new Audio();
  getDataAPI = () => {
    httpServ.getVocabularyByUnit(this.props.match.params.id).then((res) => {
      console.log(res.data)
      this.setState({ data: res.data });
    });
  };

  renderHTMl = () => {
    return this.state.data.map((word, index) => {
      return <Vocabulary word={word} key={index} handleAudio={this.handleAudio}></Vocabulary>;
    });
  };
  handleAudio = (e) => {
    this.audio.src = e.target.getAttribute("data-src-audio");
    this.audio.play();
  };
  render() {
    return (
      <div id="vocabulary-page" className={classes.body}>
        <Sidebar></Sidebar>

        <div className={classes.container}>
          <div>{this.renderHTMl()}</div>
        </div>
      </div>
    );
  }
}
