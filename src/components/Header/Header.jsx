/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha

Header is the component used on every view on our website which displays navigation throughout the website.
It also keeps track of whether or not the user is logged in.
*/
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
    this.goToResults = this.goToResults.bind(this);
    this.state = {
      loggedIn: false,
      username: "",
      isOpen: false,
      query: ""
    };
  }
  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleLogin(){
    this.setState({
      loggedIn: this.state.loggedIn
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
  loggedIn(){
    if(this.state.loggedIn)
      return(
        <Button id="LogoutButton" onClick={() => this.Logout()}>
          Logout
        </Button>
      )
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
  ReceiveQuery = (query) => {
    this.setState({
        query: query
    }, this.goToResults())
  }
  goToResults(){
    browserHistory.push({
      pathname: 'results',
      query: this.state.query
    })
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
    if(this.state.loggedIn){
      browserHistory.push({
        pathname: 'post',
        state: this.state
      })
    }
    else{
      this.goToLogin()
    }
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
  goToAbout(){
    browserHistory.push({
      pathname: 'about',
      state: this.state
    })
  }

  Logout(){
    this.setState({
      loggedIn: false,
      username: "",
      isOpen: false
    })
    browserHistory.push("")
  }
  render(){
    return (
      <Row id = 'header' >
      <Row>
        <Col sm='12' lg='12' id="disclaimer">
          SFSU-Fulda Software Engineering Project CSC 648-848, Fall 2018.  For Demonstration Only
        </Col>
      </Row>
        <Navbar id ="NavMain" lg = '12' color="grey" light expand="lg">
          <Col sm = '3' lg='3'>
            <Button id="homeBtn">
              <NavbarBrand id = "HomeButton" onClick={this.goHome}>
                <img src={require('../../assets/Gator.gif')} width="120" height ="75"/> Gator Trader
              </NavbarBrand>
            </Button>
          </Col>

          <Col sm='9' lg='9'>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar right>
                <NavItem id = "About">
                  <NavLink/>
                  <Button id="AboutButton" onClick = {() => this.goToAbout()}>
                    About
                  </Button>
                </NavItem>
                <NavItem id = "NavSell">
                  <NavLink/>
                  <Button id="SellButton" onClick = {() => this.goToPost()}>
                    Sell
                  </Button>
                </NavItem>
                {/*<NavItem id = "Admin">
                  <NavLink/>
                  <Button id="AdminDash" onClick = {() => this.goToAdmin()}>
                    Admin
                  </Button>
                </NavItem>*/}
                <NavItem id = "NavUser">
                  <NavLink />
                  {this.userStatus()}
                </NavItem>
                <NavItem id = "NavUser">
                  <NavLink />
                  {this.loggedIn()}
                </NavItem>
              </Nav>
            </Collapse>
          </Col>
        </Navbar>
      </Row>
    );
  }
}
