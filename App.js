import React from "react";
import ReactDOM from "react-dom";
import GemsSearchPage from './src/components/GemsSearchPage'

class App extends React.Component {
  render() {
    return <GemsSearchPage/>;
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);