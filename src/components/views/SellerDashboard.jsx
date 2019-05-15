/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha
SellerDashboard is the view that displays the INCOMING messages for items that
the user is SELLING. The seller can then click on one of these messages and it
will direct them to the messaging page for that item and buyer, where they
can continue to message the buyer.

NOTE* buyers cannot see incoming messages on this page because this is the seller's dashboard
*/
import React, {Component} from 'react';
import Header from '../Header/Header';
import SellerDash from '../SellerDash/SellerDash';
import {Row,Col,Button} from 'reactstrap';
import Table from 'rc-table';
import '../viewsCSS/SelllerDashboard.css'
import {browserHistory} from 'react-router';



const columns = [
  {
    title: 'Item ', dataIndex: 'name', key: 'name', align: 'center',
  },
  {
    title: 'Message', dataIndex: 'message', key: 'description', align: 'left',
  },
  {
    title: 'SentBy', dataIndex: 'sent_by', key: 'sent_by', align: 'center',
  },
  /*
  {
    title: '', dataIndex: 'price', key: 'price', align: 'center',
  }
  */
];
//console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timestamp));

export default class SellerDashboard extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: "",
      data: []
    }
  }
  onRowClick = (record, index, event) => {
    console.log(`Click nth(${index}) row of parent, record.name: ${record.name}`);
    // Redirect to new page here
    console.log(record)
    console.log(this.state.user)
    browserHistory.push({
        pathname: "contact",
        state:{
          headerState: this.props.location.state,
          itemInfo: {
            seller: record.seller, //this.props.location.state.itemInfo.seller,
            name : record.name,
            path: record.item_ID, //this.props.location.state.itemInfo.name,
            buyer: record.buyer,
            sentBy: record.sent_by
          }
        }
    })
    if (event.shiftKey) {
      console.log('Shift + mouse click triggered.');
    }
  };
  componentWillMount(){
    this.setState({
      user: this.props.location.state.username
    }, () => this.loadData())
  }

  loadData(){
    var url = "http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/messages/" + this.state.user
    console.log(url)
    fetch(url,{
      method: "GET",
      headers: {"Accept": "application/json"}
    })
    .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((data) => {
        this.valueChangeSt(data);
      })
  }
  valueChangeSt(results) {
    const newData = []
    const requests = results.map(msg => {
      return (fetch("http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/mess/" + msg.item_ID,{
        method: "GET",
        headers: {"Accept": "application/json"}
      })
      .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          } return response;})
      .then(response => response.json())
      .then(response => msg.name = response[0].name).then(response => {console.log(msg.name)}).then(response => {newData.push(msg)})
    )
    })

    Promise.all(requests).then(() => {
      this.setState({data: newData}, () => console.log("stateData:", this.state.data))
    })

  }
  render(){
    return(
      <div>
      <Header headerState={this.props.location.state}/>
      <Row>
        <Col lg={{size:4, offset:4}}>
          <p id = "dashHeader">{this.state.user + "'s Dashboard"}</p>
          <p id = "dashSub">Messages</p>
        </Col>
      </Row>
      <Row>
        <Col id = "tableCon" lg={{size:10, offset:1}}>
          <Table
            columns={columns}
            data={this.state.data}
            useFixedHeader={false}
            align="center"
            onRow={(record, index) => ({
            onClick: this.onRowClick.bind(null, record, index),
          })}
          />
        </Col>
      </Row>
      </div>
    );
  }
}
