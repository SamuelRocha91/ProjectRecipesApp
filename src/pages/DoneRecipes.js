/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/jsx/Header';
import shareIcon from '../images/shareIcon.svg';
import { URL_BASE } from '../utils/constants';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [doneFood, setDoneFood] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    setDoneFood(doneRecipes);
  }, []);

  const shareLink = (id, type) => {
    clipboardCopy(`${URL_BASE}${type}s/${id}`);
    setLinkCopied(!linkCopied);
  };

  const filterDoneRecipes = (filter) => {
    if (filter === 'all') return setDoneFood(doneRecipes);
    const filterType = doneRecipes.filter((recipes) => recipes.type === filter);
    setDoneFood(filterType);
  };

  return (
    <div>
      <Header
        title="Done Recipes"
        enableSearchIcon={ false }
      />
      <button
        onClick={ () => filterDoneRecipes('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => filterDoneRecipes('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals

      </button>
      <button
        onClick={ () => filterDoneRecipes('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks

      </button>
      {linkCopied && <p>Link copied!</p>}
      {doneFood.length !== 0 && doneFood.map((recipe, index) => {
        if (recipe.type === 'meal') {
          return (
            <>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <h2>
                  { recipe.name }
                </h2>
                <img
                  style={ { width: '180px' } }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
              <p>
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
              <p>{ recipe.doneDate}</p>
              <button onClick={ () => shareLink(recipe.id, recipe.type) }>
                <img
                  src={ shareIcon }
                  alt={ recipe.name }
                />
              </button>
              {recipe.tags.map((tag, indice) => {
                if (indice < 2) {
                  return (
                    <p key={ `${tag}${index}` }>
                      { tag }
                    </p>
                  );
                }
                return null;
              })}
            </>
          );
        }
        return (
          <>
            <a href={ `${recipe.type}s/${recipe.id}` }>
              <h2>{ recipe.name }</h2>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </a>
            <p>
              { recipe.alcoholicOrNot }
              {' '}
            </p>
            <p>{ recipe.doneDate }</p>
            <button onClick={ () => shareLink() }>
              <img
                src={ shareIcon }
                alt={ recipe.name }
              />
            </button>
          </>
        );
      })}
    </div>
  );
}

export default DoneRecipes;
