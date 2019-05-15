/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Alex Ha
Displays the results of a user's search and has a form for sorting functionality.
It also displays the count of the results returned from our database.
*/
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Listing from '../Listing/Listing';
import {Button,Row,Col} from 'reactstrap';
import {Container, Collapse, CardBody, Card } from 'reactstrap';
import '../viewsCSS/Home.css';
import Header from '../Header/Header';
import ResultContainer from '../ResultsContainer/ResultContainer';
import SearchFeatures from '../SearchFeatures/SearchFeatures';
import SearchBar from '../SearchBar/SearchBar';

const API_URL = 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/'

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfo: []
    }
    this.SearchCallback = this.SearchCallback.bind(this)
    this.CategoryCallback = this.CategoryCallback.bind(this)
    this.reloadResults = this.reloadResults.bind(this)
    this.FetchResults = this.FetchResults.bind(this)
  }
  componentDidMount(){
    console.log(this.props.location)
    var category = this.props.location.query.category
    category ? this.setState({category: category}, () => this.FetchResults()) : this.setState({percLike: this.props.location.query.percLike}, () => this.FetchResults())
    this.setState({
      itemInfo: this.props.location.state.itemInfo
    })

  }

  SearchCallback = (data) => {
    this.setState({
      percLike: data,
      category: undefined
    }, () => this.FetchResults())
  }

  CategoryCallback = (data) => {
    this.setState({
      category: data,
      percLike: undefined
    }, () => this.FetchResults())
  }

  reloadResults(){
    console.log("category", this.state.category)
    console.log("percLike", this.state.percLike)
    browserHistory.push({
      pathname: 'results',
      state:{
        itemInfo: this.state.itemInfo,
        headerState: this.props.location.state.headerState,
        resultCount: "0"
      },
      query: {
        category: this.state.category,
        percLike: this.state.percLike
      }
    })
  }
  sortCallback = (sortBy) => {
    this.setState({
      sort: sortBy
    }, () => this.FetchResults())
  }
  FetchResults = () => {
    /*
    fetch via our url/image/(category)
    fetch(url).then
    (x).then(x => (do something) )
    we then take that object and turn it into a JSON and return it
    we use .then again to map that json into an array of items[name,price,desc,path]
    we use .then again to call the callback function of the parent sending the result of the .then()
    */

    //no category, no perclike with sort
    //ec2-50-112-37-217.us-west-2.compute.amazonaws.com/descprice
    //perclike w/ sort
    //ec2-50-112-37-217.us-west-2.compute.amazonaws.com/search/desc/:bylike
    // perclike w/o sort
    // ec2-50-112-37-217.us-west-2.compute.amazonaws.com/image/search/:bylike
    var category = this.state.category
    var percLike = this.state.percLike
    var sort = this.state.sort
    var noSortMode = ""
    var query = ""
    noSortMode = ""
    //user searched by percent like
    console.log("PercLike: " , percLike)
    console.log("Category: ", category)
    //console.log("Sort: ", sort)
    if(category === undefined){
      if(percLike !== ""){
      //console.log("cat undefined, perclike != null")
      //console.log(sort)
      switch(sort){
        case ("ascprice"):
        //console.log("hello")
          query = API_URL + "search/" + "asc/" + percLike
          break;
        case ("descprice"):
          query = API_URL + "search/" + "desc/" + percLike
          break;
        case ("recent"):
          query = API_URL + "search/" + "recent/" + percLike
          break;
        default:
          console.log(query)
          query = API_URL + "search/recent/" + percLike
          break;
        }
      }else{
        console.log("searched for all items")
        if(sort !== undefined){
          query = API_URL + sort
        }
        else{
          query = API_URL + "allselling"
        }
      }
    }
    //category w/ sort
    //ec2-50-112-37-217.us-west-2.compute.amazonaws.com/descprice/:by_category
    //category w/o sort
    // ec2-50-112-37-217.us-west-2.compute.amazonaws.com/image/:by_category
    else{
      console.log("perclike is undefined")
      if(sort !== undefined){
        query = API_URL + sort + "/" +category
      }
      else{
        if(category === ""){
          query = API_URL + "recent"
        }else{
        query = API_URL + "image/" + category
        }
      }
    }

    console.log("Query: " +  query)
    fetch(query)
    //take response turn into json
    .then(response => {return response.json() } )
    //take result map all items
    .then(results =>  results.map(item =>
      {return([
        item.name,
        item.price,
        item.description,
        item.path
      ])})).then(items => this.setState({
        itemInfo: items,
        resultCount: items.length
      })).then(results => this.reloadResults())
  }
  render(){
    const { itemInfo } = this.state;

    return(
      <div>
        <Header headerState={this.props.location.state.headerState}/>
        <Row id="searchBar">
          <Col lg="12">
            <SearchBar CategoryCallback = {this.CategoryCallback} SearchCallback={this.SearchCallback} />
          </Col>
        </Row>
        <Row id="listings">
        <Col lg = "2">
        <p id = "resultct">{"Showing " + this.state.resultCount + " of " + this.state.resultCount + " results"} </p>
          <SearchFeatures sort = {this.sortCallback}/>
        </Col>
          <Col>
            <ResultContainer itemInfo={this.state.itemInfo} /> {/*An individual list that will eventually be an array of list items read in from API */}
          </Col>
        </Row>
      </div>
    );
  }
}
