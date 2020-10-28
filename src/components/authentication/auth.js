import React from 'react';
import axios from 'axios'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            first_name: '',
            second_name: '',
            email: '',
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleSecondNameChange = this.handleSecondNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsernameChange (event){
        this.setState({username: event.target.value})
    }

    handlePasswordChange (event){
        this.setState({password: event.target.value})
    }

    handleFirstNameChange (event){
        this.setState({first_name: event.target.value})
    }

    handleSecondNameChange (event){
        this.setState({second_name: event.target.value})
    }

    handleEmailChange (event){
        this.setState({email: event.target.value})
    }

    handleSubmit(event) {
        axios.post('http://localhost:8000/api/v1/users/', {
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.first_name,
            second_name: this.state.second_name,
            email: this.state.email
        })
        .then(response => console.log(response))
        .then(event.preventDefault())
    }

    render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
        </label>
        <label>
          Firstname:
          <input type="text" value={this.state.first_name} onChange={this.handleFirstNameChange} />
        </label>
        <label>
          Secondname:
          <input type="text" value={this.state.second_name} onChange={this.handleSecondNameChange} />
        </label>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit"/>
      </form>
    );
  }
}

export  {LoginForm, RegisterForm}