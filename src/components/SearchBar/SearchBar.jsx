/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha, Michael Phan
SearchBar is the component that holds the input form for searching for items, as well
as the categories dropdown menu. It returns a query to the results page which is then
used to fetch the appopriate items from our database. It keeps track of whether
the user searched by %like or by category.
*/

import React, { Component } from 'react';
import {Form} from 'reactstrap';
import {browserHistory} from 'react-router';
import Listing from '../Listing/Listing';
import './SearchBar.css';
import {Button,
        ButtonGroup,
        Row,
        Col,
        ButtonDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem
      } from 'reactstrap';


const API_URL = 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      query: '',
      results: [],
      dropdownOpen:false
    }
  }
  toggle() {
   this.setState(prevState => ({
     dropdownOpen: !prevState.dropdownOpen
   }));
 }
  FetchResults = (query) =>{
    /*
    fetch via our url/image/(category)
    fetch(url).then
    (x).then(x => (do something) )
    we then take that object and turn it into a JSON and return it
    we use .then again to map that json into an array of items[name,price,desc,path]
    we use .then again to call the callback function of the parent sending the result of the .then()
    */
    console.log(API_URL + query)
    fetch(API_URL + query)
    //take response turn into json
    .then(response => {return response.json() } )
    //take result map all items
    .then(results =>  results.map(item =>
      {return([
        item.name,
        item.price,
        item.description,
        (API_URL + item.path)
      ])}))
      .then(items => this.props.callbackFromParent(this.search.value))
  }
  SearchByCategory = (query) => {
    this.props.CategoryCallback(query)
  }
  onSubmit = (e) => {
    e.preventDefault();
    if(this.search.value == ""){
      this.props.SearchCallback("")
    }
    else{
      this.props.SearchCallback(this.state.query)
    }
  }

  handleInputChange = () => {
      this.setState({
        query:this.search.value
      })
  }

  GoToResults(event){
      browserHistory.push('/results');
  }


  render() {
    {console.log()}
    return (
    <div id = "searchContents" class="container-fluid">
      <Row>
      <Col lg="6 offset-lg-3" >
        <Row>
          <Col sm="2" lg="2">
          <ButtonDropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle id="categoryDropdown"caret>
              Categories
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() =>
                this.SearchByCategory("")}>All</DropdownItem>
                <DropdownItem divider />
              <DropdownItem  onClick={() =>
                this.SearchByCategory("textbooks")}>Textbooks</DropdownItem>
                <DropdownItem divider />
              <DropdownItem  onClick={() =>
                this.SearchByCategory("electronics")}>Electronics</DropdownItem>
                <DropdownItem divider />
              <DropdownItem onClick={() =>
                this.SearchByCategory("furniture")}>Furniture</DropdownItem>
                <DropdownItem divider />
              <DropdownItem onClick={() =>
                this.SearchByCategory("computers")}>Computers</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() =>
                  this.SearchByCategory("pets")}>Pets</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() =>
                    this.SearchByCategory("cars")}>Cars</DropdownItem>

            </DropdownMenu>
          </ButtonDropdown>
        </Col>
        <Col sm="10" lg="10" id="searchCol">
          <Form id="searchForm" onSubmit={this.onSubmit}>
            <input id="searchInput" placeholder="Search for....."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
             maxlength="40"
            />
            <Button id="searchButton">
            Search
            </Button>
          </Form>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
    );
  }
}

export default SearchBar;
