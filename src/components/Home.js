import React, { Component } from 'react'
import axios from 'axios'

export default class Home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            base:"INR",
             ratesList:[],
        }
    }

    funGetRates=(base)=>{
        axios.get('https://api.ratesapi.io/api/latest?base='+base)
        .then((res)=>{
            let xlist=[];
            for(let rate in res.data.rates){
                xlist.push({
                    currency : rate,
                    value:res.data.rates[rate],
                });
            }
            
            this.setState({ratesList:xlist});
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    componentDidMount(){
        this.funGetRates(this.state.base);
    }

    render() {
        return (
            <div className="container py-3">
                <div className="display-3 pb-3 greentxt text-center">
                    <i className="fa fa-inr"></i>AT<i className="fa fa-eur"></i>
                    <i className="fa fa-usd"></i>
                </div>          
                <div className="py-3 text-light">Base : <span className="greentxt">{this.state.base}</span>
                    <select className="form-control my-3 w-50">
                        <option value="">Change Base Currency</option>
                        {
                            this.state.ratesList.map((rate,i)=>(
                                <option value={rate.currency}>{rate.currency}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="row">
                {
                    this.state.ratesList.map((rate,i)=>(
                        <div className="col-md-6 my-2" key={i}>
                        <div className="h4 text-light holder p-3 rounded text-right">
                            <span className="greentxt float-left">{rate.currency} </span>
                            {rate.value}
                        </div>
                        </div>
                    ))
                }
                </div>
                
            </div>
        )
    }
}
