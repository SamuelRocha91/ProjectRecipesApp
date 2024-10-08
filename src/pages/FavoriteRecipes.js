import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/jsx/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import { URL_BASE, FAVORITE_RECIPES } from '../utils/constants';
import './css/FavoriteRecipes.css';
import Footer from '../components/jsx/Footer';

function FavoriteRecipes() {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
  const [, setRecipeStorage] = useState();
  const [linkCopied, setLinkCopied] = useState(false);
  const [type, setType] = useState('All');
  const shareLink = (keys) => {
    clipboardCopy(`U${URL_BASE}${keys.type}s/${keys.id}`);
    setLinkCopied(!linkCopied);
  };

  const unfavorite = (target) => {
    const teste = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
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
      <div className="favorites-container">
        <span>Favorites</span>
        <button
          type="button"
          onClick={ () => { setType('All'); } }
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => { setType('meal'); } }
        >
          Foods
        </button>
        <button
          type="button"
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
                  style={ { width: '180px' } }
                />
              </Link>
              <Link to={ `/${keys.type}s/${keys.id}` }>
                <h1>
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
                onClick={ () => unfavorite(index) }
              >
                <img
                  src={ blackHeart }
                  alt="unfavoriteIcon"
                />
              </button>
            </section>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
