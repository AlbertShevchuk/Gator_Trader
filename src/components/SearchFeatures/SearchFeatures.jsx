/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Alex Ha
SearchFeatures is the menu that allows the user to sort. It returns a value back
to the results page which is used to fetch information that is sorted by a query in
from our database.
*/
import React, {Component} from 'react';
import RegForm from '../Forms/RegForm';
import {Form,Col,Row, FormGroup,Label,
        Input,InputGroup,InputGroupText,InputGroupAddon,Button,Container,ButtonGroup,
        Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import './SearchFeatures.css'
export default class SearchFeatures extends Component{

  constructor(props) {
   super(props);

   this.toggle = this.toggle.bind(this);
   this.state = {
     popoverOpen: false
   };
 }

  toggle() {
   this.setState({
     popoverOpen: !this.state.popoverOpen
   });
 }

 onSubmit = (e) => {
   e.preventDefault()
   //console.log(this.props)
   //callback with value of sortby
   this.props.sort(this.state.sortBy);

 }

changeLowestPrice(){
}
handleInputChange = (e) => {
  this.setState({
    sortBy: e.target.id
  }, () => console.log(this.state.sortBy))

}
  render(){
    return(
      <Col id = "sorting">
        <Form onSubmit={this.onSubmit}>
          <FormGroup tag="fieldset">
            <Col lg = "5">
              <h id = "sortheader">Sort</h>
            </Col>
            <div onChange = {this.handleInputChange.bind(this)}>
            <FormGroup check>
              <Label check class = "sortEl">
                <Input type="radio" class = "radiobut" id = "ascprice" name="radio1" />{' '}
                <p class = "sortText">Lowest Price</p>
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check class = "sortEl">
                <Input type="radio" class = "radiobut" id = "descprice" name="radio1" />{' '}
                <p class = "sortText">Highest Price</p>
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check class = "sortEl">
                <Input type="radio" class = "radiobut" id = "recent" name="radio1" />{' '}
                <p class = "sortText">Most Recent</p>
              </Label>
            </FormGroup>
            </div>
            <Button color = "primary"> Apply Filters</Button>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}
