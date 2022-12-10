import { Component } from "react";
// import { Children } from "react";
import ReactDOM from "react-dom";
let target = "";
const el = document.createElement("div");
export default class Portal extends Component {
  componentDidMount() {
    // const { parent, children, className } = this.props;
    const { className } = this.props;
    target = document.body;
    const classList = ["portal-container"];
    if (className)
      className.split(" ").forEach((item) => {
        classList.push(item);
      });
    classList.forEach((item) => {
      el.classList.add(item);
    });
    target.appendChild(el);
  }
  componentWillUnmount() {
    target.removeChild(el);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, el);
  }
}
