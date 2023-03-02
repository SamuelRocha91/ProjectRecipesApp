import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" />
      <Route path="/meals" />
      <Route path="/drinks" />
      <Route path="/meals/:id-da-receita" />
      <Route path="/drinks/:id-da-receita" />
      <Route path="/meals/:id-da-receita/in-progress" />
      <Route path="/drinks/:id-da-receita/in-progress" />
      <Route path="/profile" />
      <Route path="/done-recipes" />
      <Route path="/favorite-recipes" />
    </Switch>
  );
}

export default App;
