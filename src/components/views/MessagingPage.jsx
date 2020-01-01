import React,{Component} from 'react';
import { Media } from 'reactstrap';
import Header from '../Header/Header';
import '../viewsCSS/MessagingPage.css';
import Message from '../Message/Message';
import MessageForm from '../Forms/MessageForm';
export default class MessagingPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: ""
    }
    this.myCallback = this.myCallback.bind(this)
  }

  componentDidMount(){
    this.setState({
      username: this.props.location.state.username
    })
  }
  myCallback = (dataFromChild) => {
    var array = this.state.messages
    array.push(dataFromChild)
    this.setState({
      messages: array,
    })
  }
  render(){

    return(
      <div id = "msgPage">
      <Header headerState={this.props.location.state}/>
      <p id="construct">Page still under construction</p>
        <div>
          {this.state.messages.map(msg =>
            <div id = "msgContainer">
            <Message id= "msg" messageInfo={msg} user={this.props.location.state.username}/>
        </div>)}
        </div>
      <MessageForm id = "messageForm" SendMessage = {this.myCallback}/>
     </div>
    );

  }
}
