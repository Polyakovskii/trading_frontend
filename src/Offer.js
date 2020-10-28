import React from "react";
import axios from "axios";
import Item from "./components/item"
import {Redirect} from "react-router-dom";

let TRANSACTION_TYPE = {1: "purchase", 2: "sale"}

class OffersView extends React.Component{
    render() {
        const content = this.props.offers.map(item =>
            <div key={item.id}>
                <Item item={item.item} />
                <p>Transaction type: {TRANSACTION_TYPE[item.transaction_type]}</p>
                <p>User: {item.user.username}</p>
                <p>Entry quantity: {item.entry_quantity}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
            </div>
        )
        return (
            <div>
                {content}
            </div>
        )
    }
}

class CreateOfferForm extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            item: 1,
            entry_quantity: 1,
            order_type: 1,
            transaction_type: 1,
            price: 0,
            max_quantity: null
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.makeItemOptions = this.makeItemOptions.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        axios.post('http://localhost:8000/api/v1/offers/',
            {
                item: this.state.item,
                entry_quantity: this.state.entry_quantity,
                order_type: this.state.order_type,
                transaction_type: this.state.transaction_type,
                price: this.state.price,
            },
            {
                headers: {
                    Authorization: localStorage.getItem('trading_api_token')
                }
            }
        )
        .then(response => console.log(response))
        .then(event.preventDefault())
    }

    setMaxQuantity(){
        if (this.state.transaction_type == 2){
            const item = this.props.inventory.find(item => item.item.id === this.state.item)
            return (item.quantity - item.reserved_quantity)
        }
        else{
            return null
        }
    }

    makeItemOptions() {
        if (this.state.transaction_type == 1) {
            return this.props.items.map(item =>
                <option name={item.name} value={item.id}>{item.name}</option>
            )
        }
        else {
            return this.props.inventory.map(item =>
                    <option name={item.name} value={item.item.id}>{item.item.name}</option>
            )
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                    Item:
                    <select
                        key={1}
                        name="item"
                        value={this.state.item}
                        onChange={this.handleInputChange}
                    >
                        {this.makeItemOptions()}
                    </select>
                    Quantity:
                    <input
                        key={2}
                        max={this.setMaxQuantity()}
                        name={"entry_quantity"}
                        type="number"
                        value={this.state.entry_quantity}
                        onChange={this.handleInputChange}
                    />
                    Order type:
                    <select
                        key={3}
                        name={"order_type"}
                        value={this.state.order_type}
                        onChange={this.handleInputChange}
                    >
                        <option value={1}>Market</option>
                        <option value={2}>Something else</option>
                    </select>
                    Transaction type:
                    <select
                        key={4}
                        name={"transaction_type"}
                        value={this.state.transaction_type}
                        onChange={this.handleInputChange}
                    >
                        <option value={1}>Purchase</option>
                        <option value={2}>Sell</option>
                    </select>
                    Price:
                    <input
                        key={5}
                        name={"price"}
                        type="number"
                        value={this.state.price}
                        onChange={this.handleInputChange}
                    />
                    <input type="submit"/>
            </form>
        )
    }
}

class Offer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            items: [],
            inventory: [],
            authorized: !!(localStorage.getItem("trading_api_token"))
        }
        if (this.state.authorized) {
            axios
                .get('http://localhost:8000/api/v1/offers/', {
                    headers: {
                        Authorization: localStorage.getItem('trading_api_token')
                    }
                })
                .then(response => this.setState({offers: response.data}))
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 401) {
                            this.setState({authorized: false})
                        } else console.log(err.response)

                    } else console.log(err)
                })
            axios
                .get('http://localhost:8000/api/v1/items/', {
                    headers: {
                        Authorization: localStorage.getItem('trading_api_token')
                    }
                })
                .then(response => this.setState({items: response.data}))
                .catch(err => console.log(err))
            axios
                .get('http://localhost:8000/api/v1/inventory/', {
                    headers: {
                        Authorization: localStorage.getItem('trading_api_token')
                    }
                })
                .then(response => this.setState({inventory: response.data}))
                .catch(err => console.log(err))
        }
    }
    render() {
        if (!this.state.authorized) return <Redirect
            to={{
                pathname: "/login",
                state: {referrer: this.props.location.pathname}
            }} />
        return (
            <div>
                <OffersView offers={this.state.offers}/>
                <CreateOfferForm items={this.state.items} inventory={this.state.inventory}/>
            </div>
        )
    }
}

export default Offer