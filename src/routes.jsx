/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha, Michael Phan
Routes stores all the information that react-routers needs to re-route the user
different url and load those components onto App.jsx's render function.
*/
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import About from './components/views/About'
import Home from './components/views/Home';
import Login from './components/views/LoginPage';
import ResultsPage from './components/views/ResultsPage';
import RegistrationPage from './components/views/RegistrationPage';
import ItemPage from './components/views/ItemPage';
import PostPage from './components/views/Post';
import MessagingPage from './components/views/MessagingPage';
import AdminDashboard from './components/AdminDash/AdminDash';
import SellerDashboard from './components/views/SellerDashboard';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path= 'about' component={About}/>
    <Route path = 'home' component={Home}/>
    <Route path='login' component={Login}/>
    <Route path ='reg'component={RegistrationPage}/>
    <Route path='results' component={ResultsPage} />
    <Route path= 'post' component={PostPage}/>
    <Route path='item' component={ItemPage}/>
    <Route path ="contact" component = {MessagingPage}/>
    <Route path='admin' component={AdminDashboard} />
    <Route path='seller' component={SellerDashboard} />
  </Route>
);
