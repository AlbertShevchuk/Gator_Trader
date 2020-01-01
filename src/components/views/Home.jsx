import {Button, ButtonGroup, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';
import React, { Component } from "react";
import '../viewsCSS/Home.css';
import SearchBar from '../SearchBar/SearchBar';
import Categories from '../Categories/Categories';
import Header from '../Header/Header';
import ResultContainer from './ResultContainer';
import { runInThisContext } from 'vm';

export default class Home extends Component {
  componentDidMount() {
    this.GetRecentItems()
  }
  constructor(props) {
    super(props);
    this.GetRecentItems = this.GetRecentItems.bind(this)
  //  this.setData = this.setData.bind(this)
    this.state = {
      itemInfo: [],
      name: "",

      userState: {
        username: "",
      },

      headerState: {
        loggedIn: false,
        username: "",
        isOpen: false
      }

    }
  }
  GetRecentItems = () =>{
    const API_URL = 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/';
    console.log(API_URL + 'allselling')
    fetch(API_URL + 'allselling')
    //take response turn into json
    .then(response => { return response.json() } )
    //take result map all items
    .then(results =>  results.map(item =>
      {return([
        item.name,
        item.price,
        item.description,
        (API_URL + item.path)
      ])})).then(results => this.setState({
        itemInfo: results
      }))
  }
  myCallback = (dataFromChild) => {
    console.log("Returned from child: " + dataFromChild)
    this.setState({
      itemInfo : [],
      itemInfo: dataFromChild
    })
  }
  componentWillMount(){
    this.setState({
      headerState: this.props.location.state,
    })
  }

  /*componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.location.state !== prevProps.location.state) {
    this.setData(this.props.location.state);
  }
}
  setData = (userInfo) => {
    this.setState({
      username: this.props.location.state
    });
  }*/
  toggleHeader(){
      /*if(this.state.userState.username !== undefined){
        return <Header username={this.state.username}/>
      }
      else{
        return <Header username={"billy"}/>
      }
      */
      return(
        this.state.headerState ? <Header headerState={this.state.headerState}/> : <Header headerState={undefined}/>
      )
  }
  render() {
    const { itemInfo } = this.state;
    return (
      <div>
        {this.toggleHeader()}
        <Row id="searchBar">
          <Col>
            <SearchBar callbackFromParent={this.myCallback} />
          </Col>
        </Row>
        <Row id = "categoryBar">
          <Col>
            <Categories callbackFromParent = {this.myCallback}/>
          </Col>
        </Row>
        <Row id="listings">
          <Col>
            <ResultContainer itemInfo={itemInfo} headerState={this.props.location.state}/> {/*An individual list that will eventually be an array of list items read in from API */}
          </Col>
        </Row>
      </div>
    );
  }
}
