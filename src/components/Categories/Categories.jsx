import React, { Component } from 'react';
import {Row,Col,Button} from 'reactstrap';

const API_URL = 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/';

class Categories extends Component{
  constructor(props){
    super(props)
    this.state = {
      query: ""
    }
  }

  SearchByCategory = (query) => {
    this.props.callbackFromParent(query)
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
    console.log(API_URL + 'recent/' + query)
    fetch(API_URL + 'recent/' + query)
    //take response turn into json
    .then(response => { return response.json() } )
    //take result map all items
    .then(results =>  results.map(item =>
      {return([
        item.name,
        item.price,
        item.description,
        (API_URL + item.path)
      ])}))
      .then(items => this.props.callbackFromParent(
        [items,
        this.state.query] ))
  }
  render(){
    return(
      <div class="container-fluid">
        <Row>
          <Col  id="categoryButtons" sm="4" lg="2">
            <Button onClick={() => this.SearchByCategory("cat")}> Cats </Button>
          </Col>
          <Col id="categoryButtons" sm="4" lg="2">
            <Button onClick={() => this.SearchByCategory("calculator")}> Calculators </Button>
          </Col>
          <Col  id="categoryButtons" sm="4" lg="2">
            <Button onClick={() => this.SearchByCategory("Laptop")}> Laptops </Button>
          </Col>
          <Col  id="categoryButtons" lg="2">
            <Button onClick={() => this.SearchByCategory("test")}> Test </Button>
          </Col>
          <Col  id="categoryButtons" sm="4" lg="2">
            <Button onClick={() => this.SearchByCategory("")}> Empty </Button>
          </Col>
          <Col  id="categoryButtons" sm="4" lg="2">
            <Button onClick={() => this.SearchByCategory("")}> Empty </Button>
          </Col>
        </Row>
      </div>
    )}
}

export default Categories;
