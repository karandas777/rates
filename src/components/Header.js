import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div className="brand sticky-top py-3 greentxt text-center">
        <i className="fa fa-inr"></i> A T <i className="fa fa-eur"></i>{" "}
        <i className="fa fa-usd"></i>
      </div>
    );
  }
}
