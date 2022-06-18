import React from "react";
import { connect } from "react-redux";
import { ADD2, MINUS2 } from "../store/types";
class Count extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <p>Count: {this.props.number}</p>
            <div><button onClick={ this.props.add }>+</button></div>
            <div><button onClick={ this.props.minus}>-</button></div>
        </div>
    }
}
const mapStateToProps = state => state.count2
const mapDispatchToProps = {
    add: () => ({ type: ADD2 }),
    minus: () => ({type: MINUS2})
}
export default connect(mapStateToProps, mapDispatchToProps)(Count)