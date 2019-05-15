/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Alex Ha
Login page is the view that displays the registration form and the login form.
*/
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
