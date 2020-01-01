import React, {Component} from 'react';
import LoginForm from '../LoginForm/LoginForm';
import {Button,Row,Col} from 'reactstrap';
import '../viewsCSS/LoginPage.css';
import { browserHistory } from 'react-router';
import Header from '../Header/Header';
import RegForm from '../Forms/RegForm';

export default class Login extends Component{
  componentDidMount(){
  }
  render(){
    return(
      <div>
        <Header headerState={this.props.location.state}/>
        <Row id ="form">
          <Col lg = '2'/>
          <Col lg = '4'>
            <LoginForm/>
          </Col>
          <Col lg = '4'>
            <RegForm/>
            <Col lg = '12'/>
            <Col lg = '2'/>
          </Col>
        </Row>
      </div>
    );
  }
}
