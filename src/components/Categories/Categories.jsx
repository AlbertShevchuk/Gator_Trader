import React, { Component } from 'react';
import {Row,Col,Button} from 'reactstrap';

const API_URL = 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/';

class Categories extends Component{
  constructor(props){
    super(props)
  }

  SearchByCategory = (query) => {
    console.log(query)
    this.FetchResults(query)
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
    console.log(API_URL + 'image/search/' + query)
    fetch(API_URL + 'image/search/' + query)
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
      .then(items => this.props.callbackFromParent(items))
  }
  render(){
    return(
      <Row>
        <Col lg = '2'>
          <Button onClick={() => this.SearchByCategory("cat")}>Cats</Button>
        </Col>
        <Col lg = '2'>
          <Button onClick={() => this.SearchByCategory("calculator")}> Calculators </Button>
        </Col>
        <Col lg = '2'>
          <Button onClick={() => this.SearchByCategory("Laptop")}> Laptops </Button>
        </Col>
        <Col lg ='2'>
          <Button onClick={() => this.SearchByCategory("test")}> Test </Button>
        </Col>
        <Col lg ='2'>
          <Button onClick={() => this.SearchByCategory("")}> Empty </Button>
        </Col>
        <Col lg ='2'>
          <Button onClick={() => this.SearchByCategory("")}> Empty </Button>
        </Col>
      </Row>
    )
  }
}

export default Categories;
