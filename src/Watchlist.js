import React from "react";
import axios from "axios";
import Item from "./components/item";
import {Redirect} from "react-router-dom";

class AddWatchlist extends React.Component{
    constructor(props) {
        super(props);
        this.addToWatchlist = this.addToWatchlist.bind(this)
    }

    addToWatchlist(ItemId){
        axios
            .post('http://localhost:8000/api/v1/watchlist/', {
            item: ItemId
        },
                {
                    headers: {
                        Authorization: localStorage.getItem('trading_api_token')
                    }
                }
        )
    }

    render() {
        const itemsNotInWatchlist = this.props.items.filter(item => {
            return !this.props.watchlist.find(watchlist => watchlist.item.id == item.id);
        })
        const content = itemsNotInWatchlist.map((item) =>
            <div key={item.id}>
                <Item item={item} />
                <button onClick={() => this.addToWatchlist(item.id)}>Add to watchlist</button>
            </div>
        )
        return (
            <div>
                {content}
            </div>
        )
    }
}


class WatchlistView extends React.Component{
    render(){
        console.log(this.props.watchlist)
        const content = this.props.watchlist.map((item) =>
            <Item item={item.item} />
        )
        return (
            <div>
                {content}
            </div>
        )
    }
}


class Watchlist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            watchlist: [],
            items: [],
            isAdding : false,
            authorized: !!(localStorage.getItem("trading_api_token"))
        }
        this.changeIsAdding = this.changeIsAdding.bind(this)
        if (this.state.authorized) {
            axios
                .get('http://localhost:8000/api/v1/watchlist/', {
                    headers: {
                        Authorization: localStorage.getItem('trading_api_token')
                    }
                })
                .then(response => this.setState({watchlist: response.data}))
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
        }
    }

    changeIsAdding(){
        this.setState({isAdding: !this.state.isAdding})
    }

   render(){
        if (!this.state.authorized) return <Redirect
            to={{
                pathname: "/login",
                state: {referrer: this.props.location.pathname}
            }} />
        if (this.state.isAdding){
            return (
                <div>
                    <AddWatchlist watchlist={this.state.watchlist} items={this.state.items}/>
                    <button onClick={this.changeIsAdding}>Back to watchlist</button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <WatchlistView watchlist={this.state.watchlist} />
                    <button onClick={this.changeIsAdding}>Add item to watchlist</button>
                </div>
            )
        }
   }
}


export {
    Watchlist
}