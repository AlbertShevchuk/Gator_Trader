/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Alex Ha, Athena Javier
ItemPage is the view that displays a detailed item. It allows the user to view descriptions
about the item and look at the image for the item in more detail. The user can contact the seller
from this page which brings the user to the messaging page. If the user is the seller, this button
is disabled, and if the user is not logged in, it redirects to the login page.
*/

import React,{Component} from 'react';
import { Col,Row,Jumbotron, Button } from 'reactstrap';
import {browserHistory} from 'react-router';
import Header from '../Header/Header';
import '../viewsCSS/ItemPage.css';

const SELLER_URL = "http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/getSellerFromItem/"
const API_URL = "http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/"

export default class ItemPage extends Component{
  constructor(props){
    super(props)
    this.goToMessaging = this.goToMessaging.bind(this)
    this.FetchSellerFromItem = this.FetchSellerFromItem.bind(this)
    this.EstablishBuyer = this.EstablishBuyer.bind(this)
    this.state = {
      name: "",
      price: "",
      description: "",
      path: "",
      seller: ""
    }
  }
  componentWillMount(){
    this.setState({
      headerState: this.props.location.state.headerState,
      name: this.props.location.state.itemInfo[0],
      price: this.props.location.state.itemInfo[1],
      description: this.props.location.state.itemInfo[2],
      path: this.props.location.state.itemInfo[3],
    }, () => this.FetchSellerFromItem())
  }
  FetchSellerFromItem(){
    var query = SELLER_URL + this.state.path
    fetch(query)
    //take response turn into json
    .then(response => {return response.json() } )
    //take result map all items
    .then(results =>  results.map(seller =>
      {return(
        seller.owner
      )}))
      .then(seller => this.setState({
        seller: seller[0]
      }, () => this.EstablishBuyer()))
  }
  //if the user is not the seller, establish them as a buyer
  EstablishBuyer(){
    if(this.state.headerState !== undefined){
      if(this.state.headerState.username === this.state.seller){
        document.getElementById("contact").disabled = true;
    }else{
        this.setState({
          buyer: this.state.headerState.username
        })
      }
    }
  }

  goToMessaging() {
    if(this.state.headerState === undefined
      || this.state.headerState.loggedIn === false
      || this.state.headerState.loggedIn === undefined){
      browserHistory.push({
        pathname:  'login',
        state: {
          headerState: this.props.location.state.headerState
        }
      })
    }else{
      browserHistory.push({
        pathname:  'contact',
        state: {
          headerState: this.props.location.state.headerState,
          itemInfo: this.state
        }
      })
    }
  }
  render(){
    return(
      <div>
      <Header headerState={this.props.location.state.headerState}/>
      <Col >
         <Jumbotron id = "itemCont">
        <h1 className="display-3"> {this.state.name}</h1>
         <img id = "itemPageImage" src= {API_URL + this.state.path}/>
       <p className="lead">{this.state.description}</p>
       <hr className="my-2" />
       <p>{"$" + this.state.price}</p>
       <p>Seller: {this.state.seller} </p>
       <p className="lead">
         <Button id="contact" color ="success" onClick={this.goToMessaging}> Contact Seller</Button>
       </p>
     </Jumbotron>
     </Col>
     </div>
    );
  }
}
