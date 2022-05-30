// import React from "./react";
// import ReactDOM from "./react-dom";

// const FunctionComponent = (props) => {
//   return <p>{props.title}</p>;
// };
// console.log(FunctionComponent);

// class ClassComponent extends React.Component {
//   render() {
//     return (
//       <div className="title" style={{ color: "red" }}>
//         <span>{this.props.name}</span>
//         {this.props.children}
//       </div>
//     );
//   }
// }
// let element = <ClassComponent name="hello">world</ClassComponent>;
// ReactDOM.render(element, document.getElementById("root"));

// // let element1 = (
// //   <div className="title" style={{ color: "red" }}>
// //     <span>hello</span>world
// //   </div>
// // );
// // console.log(JSON.stringify(element1, null, 2));
// // ReactDOM.render(element1, document.getElementById("root"));
// // const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );
import React from "./react";
import ReactDOM from "./react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
    console.log(this.state);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state);
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state);
      this.setState({ number: this.state.number + 1 });
      console.log(this.state);
    });
  };
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
function User(props, ref) {
  ref.current = {
    getValue: function () {
      return input.current.value;
    },
  };
  const input = React.createRef();
  return (
    <div>
      <input ref={input} />
    </div>
  );
}
const ForwardUser = React.forwardRef(User);
console.log(ForwardUser);
export class Num extends React.Component {
  constructor(props) {
    super(props);
    this.a = React.createRef();
    this.b = React.createRef();
    this.result = React.createRef();
  }
  handleClick = () => {
    console.log(this.a);
    this.result.current.value =
      this.a.current.getValue() + this.b.current.value;
  };
  render() {
    return (
      <div>
        <ForwardUser ref={this.a} />
        <input ref={this.b} />
        <button onClick={this.handleClick}>=</button>
        <input ref={this.result} />
      </div>
    );
  }
}
ReactDOM.render(<Num title="计数器" />, document.getElementById("root"));
