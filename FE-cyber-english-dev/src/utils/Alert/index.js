import React from "react";
import "./style.css";

function Alert(isValid, message) {
  if (isValid)
    return (
      <div className="alert show">
        <span className="fa fa-check-circle" />
        <span className="msg">{message}</span>
      </div>
    );
}

export { Alert };
