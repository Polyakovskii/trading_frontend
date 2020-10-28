import React from "react";

class User extends React.Component{
    render() {
        return (
            <div key={this.props.user.id}>
                <p>Username: {this.props.user.username}</p>
                <p>Full name: {this.props.user.first_name} {this.props.user.last_name} </p>
                <p>Email: {this.props.user.email} </p>
            </div>
        )
    }
}

export default User