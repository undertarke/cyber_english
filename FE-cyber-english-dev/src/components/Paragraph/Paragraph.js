import React, { Component } from "react";
import ButtonTranslate from "../Button/ButtonTranslate/ButtonTranslate";
import classes from "./Paragraph.module.css";
export default class Paragraph extends Component {
  state = {
    isTranslateParagraph: false,
  };
  renderInnerHtml(dataHTML) {
    return {
      __html: `${dataHTML}`,
    };
  }
  render() {
    let paragraph = this.props.paragraph;
    let isTranslate = this.state.isTranslateParagraph;
    let toggleCss_txt_Translate = isTranslate ? classes.show_txt_translate : classes.showOff_txt_translate;
    return (
      <div className={classes.paragraph_container}>
         <ButtonTranslate
          onClick={() => {
            let isTranslate = this.state.isTranslateParagraph;
            this.setState({ isTranslateParagraph: !isTranslate });
          }}
        ></ButtonTranslate>
        <div className={classes.paragraph} dangerouslySetInnerHTML={this.renderInnerHtml(paragraph.fullHtmlTag)}>
          {/* {!this.props.isTranslateParagraph ? "" : `${paragraph.translate}`} */}
        </div>
        <div
          className={`${classes.paragraph} ${toggleCss_txt_Translate}`}
          dangerouslySetInnerHTML={this.renderInnerHtml(this.state.isTranslateParagraph ? paragraph.translate : "")}
        >
          {/* {!this.props.isTranslateParagraph ? "" : `${paragraph.translate}`} */}
        </div>
       
      </div>
    );
  }
}
