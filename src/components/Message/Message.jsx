/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Alex Ha
Message.jsx is the component that displays a message from our database. Many of
these components are created when the user is on the messaging page. One for each
message. It distiguishes between the user's message or someone elses.
*/
import React,{Component} from 'react';
import {Row,Col, Media } from 'reactstrap';
import '../viewsCSS/MessagingPage.css';
export default class Message extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: "Alex",
      message: "new message",
      sentBy: ""
    }
    this.setData = this.setData.bind(this)
  }
  componentDidMount(){
    console.log(this.props.message, this.props.user)
    this.setState({
      user: this.props.user,
      message: this.props.message,
      sentBy: this.props.sentBy
    },() => this.EstablishUser());
  }
  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.messageInfo !== prevProps.messageInfo) {
    this.setData(this.props.messageInfo);
  }
}
  setData = (messageInfo) => {
    this.setState({
      user: this.props.location.state.username,
      messsage: messageInfo[1],
      time:messageInfo[2]
    });
  }
  EstablishUser(){
    console.log(this.state.user, this.state.sentBy)
    if(this.state.user === this.state.sentBy){
      return (
      <p class = "mytext">{this.state.message}</p>
    )
    }else{
      return(
      <p class = "msgtext">{this.state.message}</p>
    )
    }
  }
  render(){
    return(
      <Row id ="msgContainer">
      <Col lg = "2">
        <p id = "user">{this.state.sentBy}</p>
      </Col>
      <Col lg = "10">
        {this.EstablishUser()}
      </Col>
    </Row>
    );
  }
}
