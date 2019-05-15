/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha

ResultsContainer holds all of the Listing components that are created when the user
searches for items.
*/
import React, {Component} from 'react';
import {Row,Col,CardDeck} from 'reactstrap';
import {browserHistory} from 'react-router';
import '../viewsCSS/ResultsPage.css';
import Listing from '../Listing/Listing';

export default class ResultContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedOption: 'HTL',
      numResults: "5",
      results: "new Array()",
      itemInfo: []
    }
  }
  componentWillMount(){
    this.setState({
      itemInfo: this.props.itemInfo
    })
  }
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.itemInfo !== this.state.itemInfo){
      this.setState({
        itemInfo: [],
        itemInfo: this.props.itemInfo
      });
      return false;
    }
    else{
      return true;
    }
  }

  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }

  render() {
    return(
      <Col>
      <CardDeck>
        {this.props.itemInfo.map(item =>
          <Listing itemInfo = {item} headerState={this.props.headerState}/>
        )}
      </CardDeck>
      </Col>
    );
  }
}
