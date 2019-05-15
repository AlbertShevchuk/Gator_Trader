/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha, Athena Javier
Post page displays the postform component and allows users to post items.
*/

import React, {Component} from 'react';
import Header from '../Header/Header';
import PostForm from '../Forms/PostForm';
import {Row,Col,Button} from 'reactstrap';
import '../viewsCSS/Post.css';
import {browserHistory} from 'react-router';

export default class PostPage extends Component{

  goHome(){
    browserHistory.push({
      pathname: '/',
      state: this.state
    })
  }

  render(){
    return(
        <div>
          <Header headerState={this.props.location.state}/>
          <Row>
            <Col sm = {{size:6, offset:3}} lg={{size:6, offset:3}}>
              <div id="title">
                Post An Item For Sale
              </div>
            </Col>
          </Row>
          <Row>
            <Col id = "postform" lg = {{size: 8, offset:2}}>
              <PostForm header = {this.props.location.state} user = {this.props.location.state.username}/>
            </Col>
          </Row>
        </div>
    );
  }
}
