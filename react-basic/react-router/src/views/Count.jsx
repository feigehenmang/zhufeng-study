import React from "react";
import { connect } from "react-redux";
import { ADD, MINUS } from "../store/types";
class Count extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)
        return <div>
            <p>Count: {this.props.number}</p>
            <div><button onClick={ this.props.add }>+</button></div>
            <div><button onClick={ this.props.minus}>-</button></div>
        </div>
    }
}
const mapStateToProps = state => state.count
const mapDispatchToProps = {
    add: () => ({ type: ADD }),
    minus: () => ({type: MINUS})
}
export default connect(mapStateToProps, mapDispatchToProps)(Count)