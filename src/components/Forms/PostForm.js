/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha, Raul Serrano
PostForm is the form where the users can create a post after they have logged into the website.
It is rendered on the Post.jsx view which can be accessed from the header under "Sell"
*/
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,Row,Col } from 'reactstrap';
import {browserHistory} from 'react-router';
import axios from 'axios'
import './InputLayout.css';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
export default class PostForm extends Component {
  constructor(){
    super();
    this.state = {
      uName: '',
      name: '',
      desc: '',
      price: '',
      category: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onImageChange = this.onImageChange.bind(this)
  }
  componentDidMount(){
    this.setState({
      uName: this.props.user,
      headerState: this.props.header
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }
  onImageChange = (e) => {
    this.setState({image:e.target.files[0]})
  }

  onSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('uName', this.state.uName);
    bodyFormData.append('name', this.state.name);
    bodyFormData.append('desc', this.state.desc);
    bodyFormData.append('price', this.state.price);
    bodyFormData.append('category', this.state.category);
    bodyFormData.append('image', this.state.image);
    console.log(bodyFormData);
    axios({
      method: 'post',
      url: 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/uploadfile',
      data: bodyFormData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        }
      }
    }).then(response =>{
      this.goHome()
    }).catch(function (error) {
      console.log(error.response);
    });
  }
  goHome(){
    browserHistory.push({
      pathname: '/',
      state: this.state.headerState
    })
  }

  render(){
    const {
      uName: uName,
      name: name,
      desc: desc,
      price: price,
      category: category,
      image: image
  }  = this.state

    return (
      <Row>
      <Col lg={{size:8 ,offset:2}}>
        <div id="InputField">
           <AvForm id="Form" onValidSubmit={this.onSubmit}>
          <AvGroup id="FormElement">
            <Label for="uName">Username</Label>
            <AvInput  className = "text" type="text" name="uName" id="uName" readonly ="readonly" maxlength="30" autocomplete= "off" value = {uName} > {this.state.uName}</AvInput>
          </AvGroup>
          <AvGroup id ="FormElement">
          <Label for="Name">*Item</Label>
          <AvInput className = "postinput" type = "text" name = "name" maxlength="60" placeholder ="What are you selling?" value = {name} onChange={this.onChange}
          validate={{
            required: {value: true},
            pattern: {value: '[A-Za-z0-9]+$'},
            minLength: {value: 5},
            maxLength: {value: 20}
          }}/>
          <AvFeedback class = "errorMsg">Please choose a better name for your item (5-20 char)</AvFeedback>
          </AvGroup>
          <AvGroup id="FormElement">
            <Label for="desc">*Description</Label>
            <AvInput  className = "postinput" type="textarea" name="desc" id="desc" maxlength="256" placeholder="Describe the item..." value = {desc} onChange={this.onChange}
            validate={{
              required: {value: true},
              pattern: {value: "^[A-Za-z0-9!@#$%^&*'()<>/?.;,: ]+$"},
              minLength: {value: 20},
              maxLength: {value: 256}
            }}/>
            <AvFeedback class = "errorMsg">Please provide a better description for your item (20 - 256 char)</AvFeedback>
          </AvGroup>
          <AvGroup id="FormElement">
            <Label for="price">*Price</Label>
            <AvInput  className = "postinput" type="number" name="price" id="price" maxlength="8" placeholder="Price..." min="0" value = {price} onChange={this.onChange}
            validate={{
              required: {value: true},
              number: true,
              min: {value: 0}
            }}/>
          <AvFeedback class = "errorMsg">Please provide a valid price for your item</AvFeedback>
          </AvGroup>
          <AvGroup id="FormElement">
            <Label for="category">*Category</Label>
            <AvInput  className = "postinput"  type="select" name="category" id="category"  title= "Select" placeholder="Select..." value = {category} onChange={this.onChange}
            validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z ]+$'},
            }}>

            <option>Select...</option>
            <option>textbooks</option>
            <option>electronics</option>
            <option>furniture</option>
            <option>computers</option>
            <option>pets</option>
            <option>cars</option>
            </AvInput>
          <AvFeedback class = "errorMsg">Please provide a category for us to better understand what your item is</AvFeedback>
          </AvGroup>
          <AvGroup id="FormElement">
            <Label for="image">*Image</Label>
            <AvInput  className = "postinput" type="file" name="image" id="img"  onChange={this.onImageChange} >
            </AvInput>
          </AvGroup>
          <AvGroup check>
              <AvInput type="checkbox" name="terms"
                validate={{
                required:
                {value: true}}}
              />{' '}
              <Label check for = "checkbox">
              *I have read and understand the terms and agreement policy.
            </Label>
          </AvGroup>
          <AvGroup>
          <Button id="submitButton" color ="success" >Create Listing</Button>
          <Button id="backButton" color="danger" onClick={this.goHome}>Back</Button>
          </AvGroup>
          <FormText color="white">
            All fields with '*' are required. Incomplete item posts will not be posted.
          </FormText>
          </AvForm>
          </div>
        </Col>
      </Row>
    );
  }
}
