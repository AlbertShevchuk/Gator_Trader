import React, { Component } from 'react';
import {Row, Col, Button,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {browserHistory} from 'react-router';

export default class SellerItem extends Component {
    constructor(props) {
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

    gotoItem() {
        browserHistory.push('item')
    }

    render() {
        return(
          <div id="ListBound">
          <Col id = "cardCol1">
              <Card id = "cardlisting1">
                <CardImg id = "cardimg1" top width="100%" src={this.state.path} alt="Card image cap"/>
                <CardBody id="cardbody1">
                  <CardTitle>{this.state.name}</CardTitle>
                  <CardSubtitle>{"$" + this.state.price}</CardSubtitle>
                  <CardText>{this.state.description}</CardText>
                  <Button onClick= {() => this.gotoItem()} >Check Post</Button>
                  </CardBody>
              </Card>
          </Col>
          </div>
        )
    }
}
