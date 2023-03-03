import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import AppProvider from './context/AppProvider';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <AppProvider>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" render={ (props) => <Recipes { ...props } /> } />
          <Route path="/drinks" render={ (props) => <Recipes { ...props } /> } />
          <Route path="/meals/:id-da-receita" />
          <Route path="/drinks/:id-da-receita" />
          <Route path="/meals/:id-da-receita/in-progress" />
          <Route path="/drinks/:id-da-receita/in-progress" />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </RecipesProvider>
    </AppProvider>
  );
}

export default App;
