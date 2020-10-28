import React from "react";
import axios from "axios";

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
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
        axios.post('http://localhost:8000/api/v1/users/', {
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
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
          <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
        </label>
        <label>
          Firstname:
          <input name="first_name" type="text" value={this.state.first_name} onChange={this.handleInputChange} />
        </label>
        <label>
          Lastname:
          <input name="last_name" type="text" value={this.state.second_name} onChange={this.handleInputChange} />
        </label>
        <label>
          Email:
          <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
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

export default RegistrationForm