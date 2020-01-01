import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/Home';
import Login from './components/views/LoginPage';
import RegistrationPage from './components/views/RegistrationPage';
import ItemPage from './components/views/ItemPage';
import PostPage from './components/views/Post';
import MessagingPage from './components/views/MessagingPage';
import AdminDashboard from './components/AdminDash/AdminDash';
import SellerDashboard from './components/SellerDash/SellerDash';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path = 'home' component={Home}/>
    <Route path='login' component={Login}/>
    <Route path ='reg'component={RegistrationPage}/>
    <Route path='results' component={Home} />
    <Route path= 'post' component={PostPage}/>
    <Route path='item' component={ItemPage}/>
    <Route path ="contact" component = {MessagingPage}/>
    <Route path='admin' component={AdminDashboard} />
    <Route path='seller' component={SellerDashboard} />
  </Route>
);
