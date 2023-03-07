import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [doneFood, setDoneFood] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    setDoneFood(doneRecipes);
  }, []);

  const shareLink = (id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
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
                <h2
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }

                </h2>
                <img
                  style={ { width: '180px' } }
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate}</p>
              <button onClick={ () => shareLink(recipe.id, recipe.type) }>
                <img
                  src={ shareIcon }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              {recipe.tags.map((tag, indice) => {
                if (indice < 2) {
                  return (
                    <p
                      key={ `${tag}${index}` }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
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

              <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </a>

            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot }
              {' '}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            <button onClick={ () => shareLink() }>
              <img
                src={ shareIcon }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          </>
        );
      })}

    </div>
  );
}

export default DoneRecipes;
