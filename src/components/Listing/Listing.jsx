import React, { Component } from "react";
import {Row, Col, Button,
        Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import '../Listing/Listing.css';
import {browserHistory} from 'react-router';

export default class Listing extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      price: '',
      description: '',
      path: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'
    }
  }
  componentDidMount(){
    this.setState({
      name: this.props.itemInfo[0],
      price: this.props.itemInfo[1],
      description: this.props.itemInfo[2],
      path: this.props.itemInfo[3]
    });
  }
  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.itemInfo !== prevProps.itemInfo) {
    this.setData(this.props.itemInfo);
  }
}
  setData = (itemInfo) => {
    this.setState({
      name: itemInfo[0],
      price: itemInfo[1],
      description:itemInfo[2],
      path:itemInfo[3]
    });
  }
  goToItem(){
    browserHistory.push({
      pathname: 'item',
      state: {
        headerState: this.props.headerState,
        itemInfo: this.props.itemInfo
      }
    })
  }
  render() {
    return(
      <div id="ListBound">
      <Col id = "cardCol">
          <Card id = "cardlisting">
            <CardImg id = "cardimg" top width="300"  src={this.state.path} alt="Card image cap"/>
            <CardBody id="cardbody">
              <CardTitle id="cardtitle">{this.state.name}</CardTitle>
              <CardSubtitle id="cardsubtitle">{"Price: " + this.state.price}</CardSubtitle>
              <CardText id="cardtext">{"Item Description: " + this.state.description}</CardText>
              <Button onClick ={() => this.goToItem()}>Details</Button>
              </CardBody>
          </Card>
      </Col>
      </div>
    )
  }
}
