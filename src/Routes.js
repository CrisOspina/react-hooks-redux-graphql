import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/HomePage';
import FavPage from './pages/favs/FavPage';
import LoginPage from './pages/login/LoginPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/favs' component={FavPage} />
      <Route path='/login' component={LoginPage} />
    </Switch>
  );
}
