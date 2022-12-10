import "./style.css";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class SpinnerComponent extends Component {
  render() {
    return this.props.isLoading ? (
      <div className="page-overlay-wrapper">
        <div className="center__frame">
          <div className="spinner-border text-primary spinners" role="status">
            <div className="lds-spinner">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Fragment></Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.spinnerReducer.isLoading,
  };
};

export default connect(mapStateToProps, null)(SpinnerComponent);
