import React from "react";
import axios from "axios";
import Item from "./components/item";
import {Redirect} from "react-router-dom"

class Inventory extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            inventory: [],
            authorized: !!(localStorage.getItem("trading_api_token"))
        }
        if (this.state.authorized) {
            axios
                .get('http://localhost:8000/api/v1/inventory/', {
                    headers: {
                        Authorization: localStorage.getItem('trading_api_token')
                    }
                })
                .then(response => this.setState({inventory: response.data}))
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
        let content = this.state.inventory.map(item =>
            <div key={item.id}>
                <Item item={item.item} />
                <p>Quantity: {item.quantity}</p>
                <p>Reserved quantity: {item.reserved_quantity}</p>
            </div>
        )
        return (
            <div>
                {content}
            </div>
        )
    }
}

export {Inventory}