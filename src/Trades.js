import React from "react";
import axios from "axios";
import User from "./components/user";
import Item from "./components/item";
import {Redirect} from "react-router-dom";


class Trade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trades: [],
            authorized: !!(localStorage.getItem("trading_api_token"))
        }
        if (this.state.authorized) {
            axios
                .get('http://localhost:8000/api/v1/trades/', {
                    headers: {
                        Authorization: localStorage.getItem('trading_api_token')
                    }
                })
                .then(response => this.setState({trades: response.data}))
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 401) {
                            this.setState({authorized: false})
                        } else console.log(err.response)

                    } else console.log(err)
                })
        }
    }

    render() {
        if (!this.state.authorized) return <Redirect
            to={{
                pathname: "/login",
                state: {referrer: this.props.location.pathname}
            }} />
        return (
            this.state.trades.map(trade =>
                <div>
                    <Item item={trade.item} />
                    <div>Buyer:</div>
                    <User user={trade.buyer}/>
                    <div>Seller:</div>
                    <User user={trade.seller}/>
                    <div>Quantity: {trade.quantity}</div>
                    <div>Unit price: {trade.unit_price}</div>
                </div>
            )
        )
    }
}

export default Trade