/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Alex Ha
MessagingPage is the view that fetches the conversation between two users for a
specific item, then allows the current user to type a message which is sent to our
database with MessageForm. The conversation is displayed inside of Message components.
*/
import React,{Component} from 'react';
import { Media } from 'reactstrap';
import Header from '../Header/Header';
import '../viewsCSS/MessagingPage.css';
import Message from '../Message/Message';
import MessageForm from '../Forms/MessageForm';
import {Col,Row} from 'reactstrap';
import {browserHistory} from 'react-router';
export default class MessagingPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: "",
      seller: "",
      item: "",
      buyer: ""
    }
    this.myCallback = this.myCallback.bind(this)
    this.FetchMessages = this.FetchMessages.bind(this)
    //this.BuyerOrSeller = this.BuyerOrSeller.bind(this)
  }

  componentDidMount(){
//    this.CheckUserStatus(), () =>
    //this.BuyerOrSeller()
    console.log(this.props.location.state)
    this.setState({
      seller: this.props.location.state.itemInfo.seller,
      username: this.props.location.state.headerState.username,
      item : this.props.location.state.itemInfo.name,
      buyer : this.props.location.state.itemInfo.buyer,
      // sent to MessageForm
      msgInfo: {
        user: this.props.location.state.headerState.username,
        seller: this.props.location.state.itemInfo.seller,
        item : this.props.location.state.itemInfo.path,
        buyer: this.props.location.state.itemInfo.buyer
      }
    }, () => this.FetchMessages())
  }
  myCallback = () => {
    //call database to fetch messages
    console.log("Fetch invoked to retrieve messages")
    this.FetchMessages()

  }
  FetchMessages(){
    this.headerText()
    var query = "http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/messages/"
    query = query + this.state.buyer + '/' + this.props.location.state.itemInfo.path
    console.log(query)
    fetch(query)
    //take response turn into json
    .then(response => {return response.json() } )
    //take result map all items
    .then(results =>  results.map(msg =>
      {return([
         msg.seller,
         msg.buyer,
         msg.message,
         msg.sent_by
      ])})).then(messages =>
        this.setState({
          messages: messages
        }))
  }
  NoMessages(){
    if(this.state.messages === undefined || this.state.messages.length === 0) {
      return (
        <Col id = "emptyMsg" lg = {{size:8 ,offset:2}} sm = {{size:8 ,offset:2}}>
        <p>Start a conversation</p>
        </Col>
      )
    }
  }
  // go to login page if the user somehow logged out on this page
 /* CheckUserStatus(){
    console.log(this.props.location.state.headerState)
    if(this.props.location.state.headerState === undefined || this.props.location.headerState.loggedIn === false){
      this.RedirectNotLogged()
    }
  }*/
  RedirectNotLogged(){
    browserHistory.push({
      pathname: 'login',
      state:{
        headerState: this.props.location.state
      }
    })
  }
  headerText(){
    if(this.state.username === this.state.seller){
      document.getElementById("msgHeadText").innerHTML = "Messages between you and " + this.state.buyer + " for " + this.state.item
    }else{
      document.getElementById("msgHeadText").innerHTML = "Messages between you and " + this.state.seller + " for " + this.state.item
    }
  }
  render(){
    return(
      <div id = "msgPage" class ="container-fluid">
      <Header headerState={this.props.location.state.headerState}/>
      <div class = "container-fluid">
      <Col id = "msgHead" lg = {{size:6 ,offset:3}} sm = {{size:8 ,offset:2}}>
      <p id = "msgHeadText"> </p>
      </Col>
      <Row id = "messages">
          {this.NoMessages()}
        <Col>
            {this.state.messages.map(message =>
            <Message id= "msg" message={message[2]} user = {this.props.location.state.headerState.username} sentBy={message[3]}/>
            )}
          </Col>
      </Row>
      <Row>
      <Col id = "sendmessage">
        <MessageForm msgInfo = {this.state.msgInfo} SendMessage = {this.myCallback}/>
      </Col>
      </Row>
      </div>
     </div>
    );
  }
}
