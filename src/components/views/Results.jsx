import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Listing from '../Listing/Listing';
import {Button,Row,Col} from 'reactstrap';
import '../viewsCSS/Home.css';
import Header from '../Header/Header';
import ResultContainer from './ResultContainer';
import SearchBar from '../SearchBar/SearchBar';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfo: ''
    }
  }
  componentDidUpdate(){
  }
  myCallback = (dataFromChild) => {
    this.setState({
      itemInfo: dataFromChild
    })
  }

  goHome(){
    browserHistory.push('/home')
  }

  goToLogin(){
    browserHistory.push('/login')
  }

  render(){
    const { itemInfo } = this.state;

    return(
      <div>
        <Header />
        <Row>
          <Col>
            <SearchBar callbackFromParent={this.myCallback} />
          </Col>
        </Row>
        <Row id="listings">
          <Col>
            <ResultContainer itemInfo={itemInfo} /> {/*An individual list that will eventually be an array of list items read in from API */}
          </Col>
        </Row>
      </div>
    );
  }
}
