import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Header from '../Header/Header';
import {Row,Col,CardDeck} from 'reactstrap';
import SellerItem from './SellerItem';

export default class SellerDashboard extends Component {
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
                <SellerItem itemInfo = {this.state.itemInfo}/>
            </div>
        )
    }
}
