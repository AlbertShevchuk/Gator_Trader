/*
DEPRECATED
*/

import React, {Component} from 'react';
import Header from '../Header/Header';
import RegForm from '../Forms/RegForm';
export default class RegistrationPage extends Component{
  render(){
    return(
        <div>
          <Header headerState={this.props.location.state}/>
          <RegForm/>
        </div>
    );
  }
}
