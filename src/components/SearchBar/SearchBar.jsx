import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Listing from '../Listing/Listing';
import {Button, ButtonGroup, Row, Col,
        ButtonDropdown,DropdownToggle, DropdownMenu,DropdownItem} from 'reactstrap';


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
      .then(items => this.props.callbackFromParent(items))
  }
  SearchByCategory = (query) => {
    this.FetchResults("image/" + query)
  }
  onSubmit = (e) => {
    e.preventDefault();
    if(this.search.value == ""){
      this.FetchResults("allselling")
    }
    else{
      this.FetchResults(this.state.query)
    }
  }

  handleInputChange = () => {
      this.setState({
        query:'image/search/' + this.search.value
      })
  }

  GoToResults(event){
      browserHistory.push('/results');
  }


  render() {
    {console.log()}
    return (
    <div>
      <Row>
        <Col>
          <div>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Categories
              </DropdownToggle>
            <DropdownMenu>
              <DropdownItem divider />
              <DropdownItem id = "None" onClick={() => this.SearchByCategory("cat")}>Cats</DropdownItem>
              <DropdownItem id = "Star" onClick={() => this.SearchByCategory("calculator")}>Calculators</DropdownItem>
              <DropdownItem id = "Star2"onClick={() => this.SearchByCategory("laptop")}>Laptops</DropdownItem>
              <DropdownItem id = "None" onClick={() => this.SearchByCategory("test")}>Test</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          </div>
        </Col>
        <Col>
          <form onSubmit={this.onSubmit}>
            <input placeholder="Search for....."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
             maxlength="20"
            />
            <Button id = "searchbutton">
            Search
            </Button>
          </form>
        </Col>
      </Row>
    </div>
    );
  }
}

export default SearchBar;
