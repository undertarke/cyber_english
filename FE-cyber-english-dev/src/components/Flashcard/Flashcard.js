import React, { Component } from "react";
import classes from "./Flashcard.module.css";
import { capitalizeFirstLetter, shuffleArray } from "../../utils/helpers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";
class Card {
  constructor(id, word, english, vietnamese) {
    this.id = id;
    this.word = word;
    this.english = english;
    this.vietnamese = vietnamese;
  }
}
//  array for one minute option choice

let pendingFlascardOneMinute = [];
let newItemPending = {};
class Flashcard extends Component {
  state = {
    showAnswer: false,
    cards: [
      {
        word: "",
        english: "",
        vietnames: "",
      },
    ],
    currentCardIndex: 0,
    totalCards: 0,
  };

  handleShowAnswer = () => {
    this.setState({ showAnswer: true });
  };
  handleAnswerButton = (value, id) => {
    let currentCardIndex = this.state.currentCardIndex;
    let totalCard = this.state.totalCards;
    // console.log("current", this.state.currentCardIndex);
    if (value === "1Minute") {
      let cards = [...this.state.cards];
      // console.log("currentCardIndex", currentCardIndex);
      if (currentCardIndex < totalCard) {
        // console.log("currentCardIndex < totalCard", currentCardIndex, totalCard);
        pendingFlascardOneMinute.push(cards[currentCardIndex]);
      } else {
        // let item = pendingFlascardOneMinute[0];
        // console.log("newItemPending", newItemPending);
        pendingFlascardOneMinute.push(newItemPending);
        // console.log("already push", pendingFlascardOneMinute);
      }
      // console.log("push to pending cards", pendingFlascardOneMinute);
      // console.log("current cardIndex", currentCardIndex);

      // console.log("one minute");

      this.setState({
        showAnswer: false,
        currentCardIndex: currentCardIndex + 1,
      });

      return;
    } else {
      var remindDay = new Date();
      remindDay.setDate(remindDay.getDate() + value);
      let timeStamp = Math.round(remindDay.getTime() / 1000);

      let data = {
        vocabularyId: id,
        timeRemind: timeStamp,
      };

      httpServ.patchFlashCardInfor(data).then((res) => {
        // console.log("after chose 4 day or 1 day", res);
        pendingFlascardOneMinute.splice(0, 1);

        this.setState({
          currentCardIndex: currentCardIndex + 1,
          showAnswer: false,
        });
      });
    }
  };

  makeCardsFromData = (data) => {
    let newCards = data.map((item) => {
      let word = capitalizeFirstLetter(item.vocabulary);
      let english = capitalizeFirstLetter(item.dictionaryEntry);
      let vietnames = capitalizeFirstLetter(item.dictionaryEntryTranslate);
      return new Card(item.id, word, english, vietnames);
    });
    shuffleArray(newCards);
    return newCards;
  };

  componentDidMount() {
    this.currentUnit = localStorageServ.userInfor.get()?.curentUnit;

    let newCards = [];
    let cards = [];
    httpServ.getFlashCard().then((res) => {
      // console.log("data from flash card api", res.data);
      if (res.data.length > 0) {
        cards = res.data;
        newCards = this.makeCardsFromData(cards);
        // console.log("newCard", newCards);
        this.setState({ cards: newCards, totalCards: newCards.length }, () => {});
      } else {
        httpServ.getVocabularyByUnit(this.currentUnit).then((res) => {
          // console.log(res);
          cards = res.data;
          newCards = this.makeCardsFromData(cards);
          // console.log("newCard when flashcard emty ( did mount )", newCards);
          this.setState({ cards: newCards, totalCards: newCards.length }, () => {});
        });
      }
    });
  }

  render() {
    let card;
    let currentCardIndex = this.state.currentCardIndex;
    let totalCard = this.state.totalCards;
    if (pendingFlascardOneMinute.length > 0 && currentCardIndex >= totalCard) {
      card = pendingFlascardOneMinute[0];
      // console.log("card before splice", pendingFlascardOneMinute);
      newItemPending = pendingFlascardOneMinute[0];

      // console.log("newItemPending", newItemPending);
      // console.log("card after splice", pendingFlascardOneMinute);
    } else {
      card = this.state.cards[this.state.currentCardIndex];
    }
    // console.log("card to show", card);
    // console.log("totalcard", this.state.totalCards);
    // console.log("pending cards", pendingFlascardOneMinute);
    // console.log("currentCardIndex,", currentCardIndex);
    return (
      <div className={classes.background}>
        <div className={classes.container}>
          <h1 className={classes.title}>Let's practice !!</h1>
          <div className={classes.box_container}>
            {!!card && card.word ? (
              <>
                <p className={classes.question}>{card.word}</p>
                {!this.state.showAnswer ? (
                  <div className={classes.box_question}>
                    <button className={classes.button_question} onClick={this.handleShowAnswer}>
                      Show answer
                    </button>
                  </div>
                ) : (
                  <div className={classes.box_answer}>
                    <p className={`${classes.answer_english} ${classes.answer}`}>{card.english}</p>
                    <p className={`${classes.answer_vietnamese} ${classes.answer}`}>{card.vietnamese}</p>
                    <div className={classes.button_answer_box}>
                      <div className={classes.button_content}>
                        <button
                          onClick={() => {
                            this.handleAnswerButton(4, card.id);
                          }}
                          className={classes.button_easy}
                        >
                          Easy
                        </button>
                        <p>4 days</p>
                      </div>
                      <div className={classes.button_content}>
                        <button
                          className={classes.button_medium}
                          onClick={() => {
                            this.handleAnswerButton(1, card.id);
                          }}
                        >
                          Medium
                        </button>
                        <p>1 day</p>
                      </div>
                      <div className={classes.button_content}>
                        <button
                          className={classes.button_hard}
                          onClick={() => {
                            this.handleAnswerButton("1Minute");
                          }}
                        >
                          Hard
                        </button>
                        <p>1 minute </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className={classes.box_question}>
                  <h3 className={classes.notification}>
                    Wow you have learned all the vocabulary in the unit
                    {this.currentUnit} today.
                  </h3>
                </div>
              </>
            )}
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
export default connect(mapStateToProps)(withRouter(Flashcard));
