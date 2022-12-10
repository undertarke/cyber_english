import React, { Component } from "react";
import classes from "./Pagination.module.css";
export default class Pagination extends Component {
  render() {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.totalItems / this.props.itemPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    return (
      <nav aria-label="Page navigation example">
        <div className={classes.pagination_row}>
          {pageNumbers.map((number) => {
            let style =
              this.props.pageIndex + 1 === number
                ? `${classes.page_item} ${classes.active}`
                : `${classes.page_item}`;

            return (
              <div
                key={number}
                // className={classes.page_item}
                className={style}
                onClick={() => {
                  this.props.setCurrentPageHandle(number - 1);
                }}
              >
                {number}
              </div>
            );
          })}
        </div>
      </nav>
    );
  }
}
