import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: "INR",
      ratesList: [],
    };
  }

  funGetRates = (base) => {
    axios
      .get("https://api.ratesapi.io/api/latest?base=" + base)
      .then((res) => {
        let xlist = [];
        for (let rate in res.data.rates) {
          xlist.push({
            currency: rate,
            value: res.data.rates[rate],
          });
        }

        this.setState({ ratesList: xlist });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.funGetRates(this.state.base);
  }

  funSetState = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.funGetRates(this.state.base);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container py-3">
          <div className="py-3 mb-3 text-light row h4">
            <div className="col-3 text-danger text-center">Base</div>
            <div className="col-6">
              <select
                className="form-control"
                name="base"
                value={this.state.base}
                onChange={this.funSetState}
              >
                <option value="">Change Base</option>
                {this.state.ratesList.map((rate, i) => (
                  <option value={rate.currency} key={i}>
                    {rate.currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-3 text-danger text-center">
              {this.state.base}
            </div>
          </div>

          <div className="row">
            {this.state.ratesList.map((rate, i) => (
              <div className="col-md-6 my-2" key={i}>
                <div className="h4 text-light holder p-3 rounded text-right">
                  <span className="greentxt float-left">{rate.currency} </span>
                  {rate.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
