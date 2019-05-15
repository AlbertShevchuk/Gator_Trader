/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Alex Ha
About.jsx is the Milestone 0 page that displays the about information for each of our team members.
*/
import React, { Component } from "react";
import '../viewsCSS/About.css';
import {Row, Col} from 'reactstrap';
import Header from '../Header/Header';
import AboutHeader from '../AboutHeader/AboutHeader';


export default class About extends Component {
constructor(){
  super();
    this.state = {
      names: [
        "Albert",
        "Alex",
        "Athena",
        "Daniel",
        "Marcus",
        "Michael",
        "Raul",
        "Team 01"
      ],
      pictures: [
      "albert.jpg",
      "alex.jpg",
      "athena.jpg",
      "daniel.jpg",
      "marcus.jpg",
      "michael.jpg",
      "raul.jpg",
      "team01.jpg"
      ],
      aboutTexts: [
        "Hi! I am pursuing computer science at SFSU. I was born in Anapa Russia, but raised in Sac-town. My hobbies span but not limited to computer electronics and automotive technology. I’m a hands on individual who admires fixing stuff. I love the outdoors: camping, hiking, road trips, ext. Water activities are my favorite! I work at the Information Technology Services here at our school and help out the network engineers. Majority of my coding experience I have will be in c/c++ and java.",
        "Hi, I'm Alex. I am a student at San Francisco State University. Some hobbies of mine are playing games and exploring the city with my friends. I currently work at a bakery in Stonestown and I'm definitely capitalizing on getting free lattes. I am passionate about games and hopefully will find myself a career involving them.",
        "My name is Athena Javier! I’m 22 years old and I’m a Computer Science major at San Francisco State University. I grew up in San Diego, CA and decided to move to the city because I wanted to take on new adventures. I am passionate about health and nutrition and I am constantly setting fitness goals for myself. ",
        "I am a senior year computer science major. I worked mostly with C++, Java and python. I have done small projects for school but have no working experience in my field yet.",
        "Hello, I'm a Jr. Software Developer who enjoys front end web design. React is by far my favorite framework because of it's responsive nature. But when I'm not coding I love to play and write music. Music has always been a passion of mine, and I find it to be a great creative outlet.",
        "I am 24 years old majoring in computer science at SFSU. If I'm not coding, I am usually working out or playing video games.",
        "My name is Raul Serrano I like to dance and play video games. I also love computer Science and code .",
        "Hello, this is Team 01 for CSC 648 at San Francisco State University. This is a website for buying/selling goods to students at SF State. Users can login, post items, message other users, and able to schedule meet ups in person. We are currently paused on development for the time being."
      ]
    }
}
componentDidMount(){
  this.setState({
    id: 7
  })
}
setId = (id) => {
  this.setState({
    id: id
  })
}
toggleHeader(){
    return(
      this.state.headerState ? <Header headerState={this.state.headerState}/> : <Header headerState={undefined}/>
    )
}
  render(){
    var id = this.state.id;
    var picture = this.state.pictures[id];
    var aboutText = this.state.aboutTexts[id];
    var name = this.state.names[id];
    return(
      <Row>
        <Col lg={{size: 12}}>
          <div>
            <Header headerState={this.props.location.state}/>
            <Row>
              <Col lg={{size:4, offset:4}}>
                <div id="title">
                  About Us
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={{size: 6, offset: 3}}>
                <AboutHeader setId = {this.setId}/>
              </Col>
            </Row>
            <Row>
              <Col lg={{size: 12}}>
                <div id="about-container">
                  <div id= "about-person">
                    <div id="picture-container">
                      <img id ="about-picture" src={picture} width="200" height ="200"/><br/>
                    </div>
                    <p id = "about-name">{name}</p>
                  </div>
                  <div id = "about-textbox">
                    <p id = "about-text">{aboutText}</p><br/>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

    );
  }
}
