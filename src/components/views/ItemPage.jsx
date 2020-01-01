import React,{Component} from 'react';
import { Jumbotron, Button } from 'reactstrap';
import {browserHistory} from 'react-router';
import Header from '../Header/Header';
import '../viewsCSS/ItemPage.css';
export default class ItemPage extends Component{
  constructor(props){
    super(props)
    this.goToMessaging = this.goToMessaging.bind(this)
    this.state = {
      name: "",
      price: "",
      description: "",
      path: "",

    }
  }
  goToMessaging() {
    browserHistory.push({
    pathname:  'contact',
    state: this.props.location.state
    })
  }
  componentWillMount(){
    this.setState({
      headerState: this.props.location.state.headerState,
      name: this.props.location.state.itemInfo[0],
      price: this.props.location.state.itemInfo[1],
      description: this.props.location.state.itemInfo[2],
      path: this.props.location.state.itemInfo[3]
    })
  }
  render(){
    return(
      <div>
      <Header headerState={this.props.location.state}/>
         <Jumbotron>
        <h1 className="display-3"> {this.state.name}</h1>
         <img id = "itemPageImage" src= {this.state.path}/>
       <p className="lead">{this.state.description}</p>
       <hr className="my-2" />
       <p>{this.state.price}</p>
       <p>Seller: alexha415 </p>
       <p className="lead">
         <Button color="primary" onClick={this.goToMessaging}>Purchase</Button>
         <Button color ="success" onClick={this.goToMessaging}> Contact Seller</Button>
       </p>
     </Jumbotron>
     </div>
    );
  }
}
