import React from 'react';
import axios from 'axios'
import {Redirect} from "react-router-dom";
import User from "./components/user";

class UserList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            authorized: !!(localStorage.getItem("trading_api_token"))
        }
        if (this.state.authorized) {
            axios
                .get('http://localhost:8000/api/v1/users/', {
                    headers: {
                        Authorization: localStorage.getItem('trading_api_token')
                    }
                })
                .then((res,) => this.setState(
                    {users: res.data}
                ))
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
        const content = this.state.users.map((user) =>
            <User user={user} />
        )
        return (
            <div>
                {content}
            </div>
        )
    }
}

class SingleUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            authorized: !!(localStorage.getItem("trading_api_token"))
        }
        if (this.state.authorized) {
            axios.get(`http://localhost:8000/api/v1/users/${this.props.match.params.id}/`, {
                headers: {
                    Authorization: localStorage.getItem('trading_api_token')
                }
            })
                .then((response) => this.setState({user: response.data}))
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
        return <User user={this.state.user} />
    }
}


export  {
    UserList,
    SingleUser,
}