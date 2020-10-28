import React from "react";

class Item extends React.Component{
    render() {
        return(
            <div key={this.props.item.id}>
                <p>{this.props.item.code}</p>
                <p>{this.props.item.name}</p>
                <p>{this.props.item.logo}</p>
                <p>{this.props.item.details}</p>
                <p>Currency: {this.props.item.currency.name}</p>
            </div>
        )
    }
}

export default Item