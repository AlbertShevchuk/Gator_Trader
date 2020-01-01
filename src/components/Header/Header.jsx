import React, {Component} from 'react';
import './Header.css';
import {Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,Button,Row,Col} from 'reactstrap';
import {browserHistory} from 'react-router';
import RegForm from '../Forms/RegForm';
export default class Header extends Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.goHome = this.goHome.bind(this);
    this.state = {
      loggedIn: false,
      username: "",
      isOpen: false
    };
  }
  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleLogin(){
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }
  userStatus(){
    if(this.state.loggedIn){
      return (
        <Button id="UsernameButton" onClick={() => this.goToSeller()}>
          {this.props.headerState.username}
        </Button>
      )
    }else{
      return(
        <Button id="UsernameButton" onClick={() => this.goToLogin()}>
          Login | Reg
        </Button>
      )
    }
  }
  componentWillMount(){
this.props.headerState ?
        this.setState({
          username: this.props.headerState.username,
          loggedIn: this.props.headerState.loggedIn,
          isOpen: this.props.headerState.isOpen
        })
        :
        console.log("nothing")
  }

  componentDidUpdate(prevProps){
    console.log(this.props.headerState)
    if(this.props.headerState !== prevProps.headerState){
      this.updateHeader(this.props.headerState)
    }
  }
  updateHeader(newProps){
    this.setState({
      username: newProps.username,
      loggedIn: newProps.loggedIn,
      isOpen: newProps.isOpen
    })
  }

  goToLogin(){
    browserHistory.push({
      pathname: 'login',
      state: this.state
    })
  }
  goHome(){
    browserHistory.push({
      pathname: '/',
      state: this.state
    })
  }
  goToReg(){
    browserHistory.push({
      pathname: 'reg',
      state: this.state
    })
  }
  goToPost(){
    browserHistory.push({
      pathname: 'post',
      state: this.state
    })
  }

  goToAdmin(){
    browserHistory.push({
      pathname: 'admin',
      state: this.state
    })
  }

  goToSeller() {
    browserHistory.push({
      pathname: 'seller',
      state: this.state
    })
  }

  render(){
    return (
      <div id="header">
      <Row>
        <Navbar id ="NavMain" lg = '12' color="grey" light expand="lg">
          <Col sm = '3' lg='3'>
            <NavbarBrand id = "HomeButton" onClick={this.goHome}>
              <img src={require('../../assets/Gator.gif')} width="120" height ="75"/> Gator Trader
            </NavbarBrand>
          </Col>
          <Col sm='9' lg='9'>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar right>
                <NavItem id = "Admin">
                  <NavLink/>
                  <Button id="AdminDash" onClick = {() => this.goToAdmin()}>
                    Admin
                  </Button>
                </NavItem>

                <NavItem id = "NavUser">
                  <NavLink />
                  {this.userStatus()}
                </NavItem>
                <NavItem id = "NavSell">
                  <NavLink/>
                  <Button id="SellButton" onClick = {() => this.goToPost()}>
                    Sell
                  </Button>
                </NavItem>
                <NavItem id = "NavSell">
                  <NavLink/>
                  <Button id="LoginToggle" onClick = {() => this.toggleLogin()}>
                    Login Toggle
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Col>
        </Navbar>
      </Row>
    </div>
    );
  }
}
