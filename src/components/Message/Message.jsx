import React,{Component} from 'react';
import {Col, Media } from 'reactstrap';
import '../viewsCSS/MessagingPage.css';
export default class Message extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: "Alex",
      message: "new message",
      time: ""
    }
    this.setData = this.setData.bind(this)
  }
  componentDidMount(){

    this.setState({
      user: this.props.user,
      message: this.props.messageInfo[1],
      time: this.props.messageInfo[2]
    },() => {console.log(this.state.user)});
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
  render(){
    return(
      <div>
      <Col>
      <Media>
      <Media left href="#">
        <Media src={require("../../assets/Gator.gif")} alt="Generic placeholder image" />
        <p id = "user">{this.state.user}</p>
      </Media>
      <Media body>
        <Media heading id>
        </Media>
        <p id = "msgtext">{this.state.message}</p>
      </Media>
    </Media>
    </Col>
     </div>
    );
  }
}
