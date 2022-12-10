import React, { Component } from "react";
import Pagination from "../Pagination/Pagination";
import classes from "./Wordlist.module.css";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import httpServ from "../../services/http.service";
class Wordlist extends Component {
  state = {
    words: [],
    pagination: {
      pageSize: "10",
      pageIndex: 0,
    },
    action: {
      type: "",
      id: "",
    },
  };
  confirmRef = React.createRef();

  componentDidMount() {
    this.getDataAPI();
  }
  getDataAPI = () => {
    let pageSize = this.state.pagination.pageSize;
    let pageIndex = this.state.pagination.pageIndex;
    httpServ.getWordList(pageSize, pageIndex).then((res) => {
      this.setState({
        words: res.data.wordList,
        pagination: res.data.pagination,
      });
    });
  };
  setHighlightedHandle = (id) => {
    // console.log(id);
    let confirmEl = this.confirmRef.current;
    let action = this.state.action;
    action.type = "highlight";
    action.id = id;
    this.setState({ action: action }, () => {
      confirmEl.style.display = "block";
    });
  };
  setDeletedHandle = (id) => {
    let confirmEl = this.confirmRef.current;
    let action = this.state.action;

    action.type = "delete";
    action.id = id;
    this.setState({ action: action }, () => {
      confirmEl.style.display = "block";
    });
  };
  // confirm box
  cancelConfirmHandle = () => {
    this.confirmRef.current.style.display = "none";
    let action = this.state.action;

    action.id = "";
    action.type = "";
    this.setState({ action: action });
  };
  confirmHandle = () => {
    let action = this.state.action;

    if (action.type === "highlight") {
      httpServ.changeStatusWordListByID(action.id).then((res) => {
        this.getDataAPI();
      });
    }
    if (action.type === "delete") {
      httpServ.deleteWordListByID(action.id).then((res) => {
        this.getDataAPI();
      });
    }
    this.confirmRef.current.style.display = "none";
    action.id = "";
    action.type = "";
    this.setState({ action: action });
  };
  renderTbody = (words) => {
    return words.map((word, index) => {
      let rowCSS = classes.trTagTbody;
      if (word.isHighlight) {
        rowCSS = `${classes.trTagTbody} ${classes.highlightRow}`;
      }
      return (
        <tr className={rowCSS} key={index}>
          <td>{word.vocabulary}</td>
          <td>{word.translate}</td>
          <td className={classes.highlightBtn}>
            <i
              onClick={() => {
                this.setHighlightedHandle(word.wordlistId);
              }}
              className="fa fa-check"
            ></i>
          </td>
          <td className={classes.deleteBtn}>
            <i
              onClick={() => {
                this.setDeletedHandle(word.wordlistId);
              }}
              className="fa fa-times"
            ></i>
          </td>
        </tr>
      );
    });
  };
  // pagination

  setCurrentPageHandle = (value) => {
    let pagination = this.state.pagination;
    pagination.pageIndex = value;
    this.setState({ pagination: pagination }, () => {
      this.getDataAPI();
      // console.log(this.state.pagination.pageIndex);
    });
  };

  render() {
    // if (!this.props.token) {
    //   // return <Login></Login>;
    //   this.props.history.push("/login");
    // }
    const data = this.state.words.filter((elem) => !elem.isDeleted);
    return (
      <div className={classes.container}>
        {this.state.words && this.state.words.length && data && data.length ? (
          <>
            <table style={{ borderCollapse: "collapse" }} className={classes.table}>
              <thead>
                <tr>
                  <th>English</th>
                  <th>Vietnamese</th>
                  <th>Highlight</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className={classes.tbody}>{this.renderTbody(data)}</tbody>
            </table>
          </>
        ) : (
          <div className={classes.no__data__message}>
            <h3>No data in your word list</h3>
          </div>
        )}

        <div className={classes.confirm_box} ref={this.confirmRef}>
          <div className={classes.container_confirm_box}>
            <p>Are you sure you want to {this.state.action.type} this word?</p>
            <div className={`${classes.btn_container} `}>
              <button className={classes.cofirm_btn} onClick={this.confirmHandle}>
                Confirm
              </button>
              <button onClick={this.cancelConfirmHandle}>Cancel</button>
            </div>
            {/* {this.renderConfirmBox()} */}
          </div>
        </div>

        {this.state.words && this.state.words.length && data && data.length ? (
          <>
            <div className={classes.pagination_container}>
              <Pagination
                setCurrentPageHandle={this.setCurrentPageHandle}
                totalItems={this.state.pagination.total}
                itemPerPage={this.state.pagination.pageSize}
                pageIndex={this.state.pagination.pageIndex}
              ></Pagination>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(withRouter(Wordlist));
