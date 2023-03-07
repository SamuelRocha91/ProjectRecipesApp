import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" render={ (props) => <Recipes { ...props } /> } />
      <Route exact path="/drinks" render={ (props) => <Recipes { ...props } /> } />
      <Route
        exact
        path="/meals/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route
        exact
        path="/done-recipes"
        render={ (props) => <DoneRecipes { ...props } /> }
      />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals/:id-da-receita/in-progress" />
      <Route exact path="/drinks/:id-da-receita/in-progress" />
    </Switch>
  );
}

export default App;
