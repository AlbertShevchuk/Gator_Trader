import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {browserHistory} from 'react-router';
import axios from 'axios'
import './InputLayout.css';

export default class PostForm extends Component {
  constructor(){
    super();
    this.state = {
      uName: '',
      name: '',
      desc: '',
      price: '',
      category: '',
      image: null

    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onImageChange = this.onImageChange.bind(this)
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
    bodyFormData.append('image', e.target.image.files[0]);
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
      browserHistory.push('/')     
    }).catch(function (error) {
      console.log(error.response);
    });
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
    <div id="InputField">
       <Form id="Form" onSubmit={this.onSubmit}>
      <FormGroup id="FormElement">
        <Label for="uName">User_Name</Label>
        <Input  className = "postinput" type="text" name="uName" id="uName" maxlength="30" placeholder="User_Name" value = {uName} onChange={this.onChange}/>
      </FormGroup>
      <FormGroup id ="FormElement">
      <Label for="name">Item</Label>
      <Input className = "postinput" type = "text" name = "name" maxlength="60" placeholder ="What are you selling?" value = {name} onChange={this.onChange}/>
      </FormGroup>
      <FormGroup id="FormElement">
        <Label for="desc">Description</Label>
        <Input  className = "postinput" type="text" name="desc" id="desc" maxlength="256" placeholder="Describe the item..." value = {desc} onChange={this.onChange}/>
      </FormGroup>
      <FormGroup id="FormElement">
        <Label for="price">Price</Label>
        <Input  className = "postinput" type="text" name="price" id="price" maxlength="8" placeholder="Price..." value = {price} onChange={this.onChange}/>
      </FormGroup>
      <FormGroup id="FormElement">
        <Label for="category">Category</Label>
        <Input  className = "postinput" type="text" name="category" id="category" maxlength="30" placeholder="Category" value = {category} onChange={this.onChange}/>
      </FormGroup>
      <FormGroup id="FormElement">
        <Label for="image">Image</Label>
        <Input  className = "postinput" type="file" name="image" id="img" placeholder="Upload an Image..." value = {image} onImageChange={this.onImageChange}/>
      </FormGroup>
      <Button color ="success">Create Listing</Button>
      </Form>
    </div>
    );
  }
}
