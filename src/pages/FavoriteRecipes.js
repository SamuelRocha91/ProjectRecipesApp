import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header
        title="Favorite Recipes"
        enableSearchIcon={ false }
      />
      <span>Favorite Recipes</span>
    </div>
  );
}

export default FavoriteRecipes;
