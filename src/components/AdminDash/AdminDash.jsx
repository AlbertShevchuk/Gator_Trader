import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Header from '../Header/Header';
import AdminItem from  '../AdminDash/AdminItem';

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemInfo: [
                'Michael Phan',
                '1,000,0000,000',
                'Group Member',
                '/Users/michaelphan/school/csc648-fa18-Team01/src/assets/Gator.gif'
            ]
        }
    }

    render() {
        return(
            <div>
                <Header headerState={this.props.location.state}/>
                <AdminItem itemInfo = {this.state.itemInfo} />
            </div>
        )
    }
}
