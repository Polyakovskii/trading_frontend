import React from "react";
import axios from "axios";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
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
        axios.post('http://localhost:8000/api/token/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => localStorage.setItem('trading_api_token', `jwt ${response.data.token}`))
            .then(() => {
                if (this.props.location.state) {
                    if ("referrer" in this.props.location.state) {
                        const referrer = this.props.location.state.referrer
                        const {history} = this.props
                        history.push(referrer)
                    }
                }
            })
            .then(event.preventDefault())
    }

    render() {
    console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <input type="submit"/>
      </form>
    );
  }
}

export default LoginForm