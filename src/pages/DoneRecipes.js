import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      <Header
        title="Done Recipes"
        enableSearchIcon={ false }
      />
      <span>Done Recipes</span>
    </div>
  );
}

export default DoneRecipes;
