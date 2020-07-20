import React from "react";
import ReactDOM from "react-dom";
import GemsList from './src/GemsList'

class App extends React.Component {
  render() {
    return <GemsList/>;
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);