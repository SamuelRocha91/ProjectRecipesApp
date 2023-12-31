import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function FavoriteRecipes() {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [, setRecipeStorage] = useState();
  const [linkCopied, setLinkCopied] = useState(false);
  const [type, setType] = useState('All');
  const shareLink = (keys) => {
    clipboardCopy(`http://localhost:3000/${keys.type}s/${keys.id}`);
    setLinkCopied(!linkCopied);
  };

  const unfavorite = (target) => {
    const teste = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const resultFilter = teste.filter((element, index) => index !== target);
    localStorage.setItem('favoriteRecipes', JSON.stringify(resultFilter));
    setRecipeStorage(resultFilter);
  };

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
        onClick={ () => { setType('All'); } }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => { setType('meal'); } }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => { setType('drink'); } }
      >
        Drinks
      </button>
      {favorites.filter((item) => type === item.type || type === 'All')
        .map((keys, index) => (
          <section key={ keys.id }>
            <Link to={ `/${keys.type}s/${keys.id}` }>
              <img
                src={ keys.image }
                alt="Recipe Pic"
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '180px' } }
              />
            </Link>
            <Link to={ `/${keys.type}s/${keys.id}` }>
              <h1
                data-testid={ `${index}-horizontal-name` }
              >
                {keys.name}
              </h1>
            </Link>
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              {keys.type === 'meal' ? `${keys.nationality} - ${keys.category}`
                : `${keys.alcoholicOrNot}` }
            </h3>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src="src/images/shareIcon.svg"
              onClick={ () => shareLink(keys) }
            >
              Share
            </button>
            {linkCopied && <p>Link copied!</p>}
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src="../images/blackHeartIcon.svg"
              onClick={ () => unfavorite(index) }
            >
              <img
                src="../images/blackHeartIcon.svg"
                alt="unfavoriteIcon"
              />
            </button>
          </section>
        ))}
    </div>
  );
}

export default FavoriteRecipes;
