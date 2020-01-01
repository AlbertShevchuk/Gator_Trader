import React, {Component} from 'react';
import Header from '../Header/Header';
import PostForm from '../Forms/PostForm';
import {Row,Col} from 'reactstrap';
export default class PostPage extends Component{
  render(){
    return(
        <div>
            <Header headerState={this.props.location.state}/>
          <Row>
          <Col lg='3'/>
            <Col lg = '6' style = {{margin: '35px'}}>
              <PostForm/>
            </Col>
          </Row>
        </div>
    );
  }
}
