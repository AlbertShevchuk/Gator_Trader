/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Alex Ha
Home.jsx is the main page for the entire project. This page does an initial fetch to
get the most recent items from our database, then displays how many items are currently in our database.
*/

import {Button, ButtonGroup, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';
import React, { Component } from "react";
import '../viewsCSS/Home.css';
import SearchBar from '../SearchBar/SearchBar';
import Header from '../Header/Header';
import ResultContainer from '../ResultsContainer/ResultContainer';
import { runInThisContext } from 'vm';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.GetRecentItems = this.GetRecentItems.bind(this)
    this.goToResults = this.goToResults.bind(this);
    this.SearchCallback = this.SearchCallback.bind(this)
    this.CategoryCallback = this.CategoryCallback.bind(this)
    this.SetTotalCount = this.SetTotalCount.bind(this)
  //  this.setData = this.setData.bind(this)
    this.state = {
      itemInfo: [],
      name: "",
      userState: {
        username: "",
      },
      headerState: {
        loggedIn: false,
        username: "",
        isOpen: false
      }
    }
  }
  SetTotalCount(){
    const API_URL = 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/';
    fetch(API_URL + 'allselling')
    //take response turn into json
    .then(response => { return response.json() } )
    //take result map all items
    .then(results =>  results.map(item =>
      {return([
        item.name,
        item.price,
        item.description,
        item.path
      ])})).then(results =>  this.setState({
          itemCount: results.length
        }))
  }
  GetRecentItems = () => {
    const API_URL = 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/';
    fetch(API_URL + 'recent/first15')
    //take response turn into json
    .then(response => { return response.json() } )
    //take result map all items
    .then(results =>  results.map(item =>
      {return([
        item.name,
        item.price,
        item.description,
        item.path
      ])})).then(results => this.setState({
        itemInfo: results
      }), () => console.log(this.state.itemInfo))
  }
  CategoryCallback = (data) => {
    console.log(data)
    this.setState({
      category: data
    },() => this.goToResults())
  }
  SearchCallback = (data) => {
        console.log(data)
    this.setState({
      percLike: data
    },() => this.goToResults())
  }
  goToResults(){
    browserHistory.push({
      pathname: 'results',
      state:{
        itemInfo: this.state.itemInfo,
        headerState: this.props.location.state
      },
      query: {
        category: this.state.category,
        percLike: this.state.percLike
      }
    })
  }
  componentWillMount(){
    this.GetRecentItems()
    this.SetTotalCount()
    this.setState({
      headerState: this.props.location.state,
    })
  }
  toggleHeader(){
      return(
        this.state.headerState ? <Header headerState={this.state.headerState}/> : <Header headerState={undefined}/>
      )
  }
  render() {
    const { itemInfo } = this.state;
    return (
      <div class="container-fluid">
        {this.toggleHeader()}
        <Row id="searchBar">
          <Col sm= "12" lg="12">
            <SearchBar CategoryCallback = {this.CategoryCallback} SearchCallback={this.SearchCallback} />
          </Col>
        </Row>
        <Row>
          <Col sm= "12" lg={{size:4, offset:4}} >
            <p id="homeTitle"> 15 Most Recent Items</p>
            {/*<p id = "itemCount">{"There are currently " + this.state.itemCount + " items available"}</p>*/}
          </Col>
        </Row>
        <Row id="listings" lg = "10">
          <Col lg="12">
            <ResultContainer itemInfo={itemInfo} headerState={this.props.location.state}/> {/*An individual list that will eventually be an array of list items read in from API */}
          </Col>
        </Row>
      </div>
    );
  }
}
