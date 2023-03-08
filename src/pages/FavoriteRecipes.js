import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return (
    <div>
      <Header
        title="Favorite Recipes"
        enableSearchIcon={ false }
      />
      <span>Favorites</span>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favorites.map((keys, index) => (
        <section key={ keys.id }>
          <img
            src={ keys.image }
            alt="Recipe Pic"
            data-testid={ `${index}-horizontal-image` }
          />
          <h1
            data-testid={ `${index}-horizontal-name` }
          >
            {keys.name}
          </h1>
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            {keys.category}
          </h3>
          <h3>
            {keys.nationality}
          </h3>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Share
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            Favorite
          </button>
        </section>
      ))}

    </div>
  );
}

export default FavoriteRecipes;
