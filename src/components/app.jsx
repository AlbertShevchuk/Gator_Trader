import React, { Component } from 'react';
import Home from './views/Home';
class App extends Component {
  render() {
            console.log(this.props)
    return (
      <div>{React.cloneElement(this.props.children, { location: this.props.location })}</div>
    );
  }
}

export default App;
