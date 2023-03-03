import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" />
      <Route path="/meals/:id-da-receita" />
      <Route path="/drinks/:id-da-receita" />
      <Route path="/meals/:id-da-receita/in-progress" />
      <Route path="/drinks/:id-da-receita/in-progress" />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" />
      <Route path="/favorite-recipes" />
    </Switch>
  );
}

export default App;
