/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/jsx/Header';
import shareIcon from '../images/shareIcon.svg';
import { URL_BASE } from '../utils/constants';
import './css/DoneRecipes.css';
import Footer from '../components/jsx/Footer';

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
      <div className="done-content">
        <button
          className="btn-categories-main"
          onClick={ () => filterDoneRecipes('all') }
        >
          All
        </button>
        <button
          className="btn-categories-main"
          onClick={ () => filterDoneRecipes('meal') }
        >
          Meals
        </button>
        <button
          className="btn-categories-main"
          onClick={ () => filterDoneRecipes('drink') }
        >
          Drinks
        </button>
        {linkCopied && <p>Link copied!</p>}
        {doneFood.length !== 0 && doneFood.map((recipe, index) => {
          if (recipe.type === 'meal') {
            return (
              <div className="card-done" key={ index }>
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <h2>
                    { recipe.name }
                  </h2>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                </Link>
                <p>
                  { `${recipe.nationality} - ${recipe.category}` }
                </p>
                <p>{ recipe.doneDate}</p>
                <button
                  className="btn-categories-main"
                  onClick={ () => shareLink(recipe.id, recipe.type) }
                >
                  <img
                    src={ shareIcon }
                    alt={ recipe.name }
                    className="search-img-btn"
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
              </div>
            );
          }
          return (
            <div className="card-done" key={ index }>
              <a href={ `${recipe.type}s/${recipe.id}` }>
                <h2>{ recipe.name }</h2>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </a>
              <p>
                { recipe.alcoholicOrNot }
                {' '}
              </p>
              <p>{ recipe.doneDate.split(/[T|Z]/).join(' ') }</p>
              <button
                className="btn-categories-main"
                onClick={ () => shareLink() }
              >
                <img
                  src={ shareIcon }
                  alt={ recipe.name }
                  className="search-img-btn"
                />
              </button>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
