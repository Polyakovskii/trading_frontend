import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom"

class Currencies extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            authorized: !!(localStorage.getItem("trading_api_token"))
        }
        if (this.state.authorized) {
            axios
                .get('http://localhost:8000/api/v1/currencies/', {
                    headers: {
                        Authorization: localStorage.getItem('trading_api_token')
                    }
                })
                .then((response,) => this.setState({currencies: response.data}))
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
         const content = this.state.currencies.map((currency) =>
             <div key={currency.id}>
                 <p>Code: {currency.code}</p>
                 <p>Name: {currency.name}</p>
                 <p>Active: {currency['is_active']} </p>
             </div>
         )
          return (
            <div>
                {content}
            </div>
        )
     }
}

export default Currencies