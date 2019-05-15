import {Button} from 'reactstrap';
import {ButtonGroup} from 'reactstrap';
import React, { Component } from "react";
import { browserHistory } from 'react-router';

export default class AboutHeader extends React.Component{

  changeAbout(id){
    this.props.setId(id);
  }

  render(){
    return (
      <div>
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
        </header>
      </div>
      <div id ="about-buttons">
      <ButtonGroup id = "buttons">
          <Button id ="Home" outline color="info" onClick ={() => this.changeAbout(7)}>Gator Trader</Button>
              <Button id ="Albert" color="info" onClick ={() => this.changeAbout(0)}>Albert</Button>
              <Button id ="Alex" color="info" onClick ={() => this.changeAbout(1)}>Alex</Button>
              <Button id ="Athena" color="info" onClick={() => this.changeAbout(2)}>Athena</Button>
              <Button id ="Daniel" color="info" onClick ={() => this.changeAbout(3)}>Daniel</Button>
              <Button id ="Marcus" color="info" onClick ={() => this.changeAbout(4)}>Marcus</Button>
              <Button id ="Michael" color="info" onClick ={() => this.changeAbout(5)}>Michael</Button>
              <Button id ="Raul" color="info" onClick ={() => this.changeAbout(6)}>Raul</Button>
      </ButtonGroup>
      </div>
      </div>
    );
  }
}
