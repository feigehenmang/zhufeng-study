import { inject, observer } from "mobx-react";
import React from "react";
import { CountType } from "./store";
export type ICounterProps = {
    count?: CountType
}
class Counter extends React.Component<ICounterProps> {
    constructor(props: ICounterProps) {
        super(props)
    }
    render() {
        console.log(this.props)
        return <div>
            <p>{this.props?.count?.number}</p>
            <div>
                <button onClick={() => this.props?.count?.add()}>+</button>
                <button onClick={() => this.props?.count?.minus()}>-</button>
            </div>
        </div>
    }
}




export default inject('count')(observer(Counter))