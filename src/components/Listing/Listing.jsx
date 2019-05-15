/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha
Listing is the component that displays each search result returned inside of a bootstrap
<Card>. It contains a button that sends users to a detailed itempage.
*/
import React, { Component } from "react";
import {Row, Col, Button,
        Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import '../Listing/Listing.css';
import {browserHistory} from 'react-router';

const API_URL = 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/thumb/'
export default class Listing extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      price: '',
      description: '',
      path: 'http://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'
    }
  }
  componentDidMount(){
    this.setState({
      name: this.props.itemInfo[0],
      price: this.props.itemInfo[1],
      description: this.props.itemInfo[2],
      path: this.props.itemInfo[3]
    })
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
      <Col id = "cardCol" >
          <Card id = "cardlisting">
            <Row>
              <Button id="cardImgBtn"onClick ={() => this.goToItem()}>
                <CardImg id = "cardimg" top width="300"  src={API_URL + this.state.path} alt="Card image cap"/>
              </Button>
            </Row>
            <Row>
              <CardBody id="cardbody">
                <Row>
                  <CardTitle id="cardtitle">{this.state.name}</CardTitle>
                </Row>
                <Row>
                  <CardSubtitle id="cardsubtitle">{"Price: $" + this.state.price}</CardSubtitle>
                </Row>
                <Row>
                  <CardText id="cardtext">{"Item Description: " + this.state.description}</CardText>
                </Row>
                <Row>
                  <Button onClick ={() => this.goToItem()}>Details</Button>
                </Row>
              </CardBody>
            </Row>
          </Card>
      </Col>
    )
  }
}
