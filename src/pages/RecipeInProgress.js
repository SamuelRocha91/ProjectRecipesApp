import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import '../App.css';
import clipboardCopy from 'clipboard-copy';
import { saveInProgressStorage } from '../helpers/saveStorage';
import { deleteFavorite, alreadyExist } from '../helpers/IsFavoriteLogic';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgres({ match, history }) {
  const { location: { pathname } } = history;
  const { params: { id } } = match;

  const route = pathname.includes('/meals') ? 'meals' : 'drinks';
  const Favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const [foodInProgress, setfoodInProgress] = useState(undefined);
  const [listIngredients, setListIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState();
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (pathname.includes('/meals')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((data) => data.json()).then((response) => {
        const food = response.meals[0];
        const keys = Object.entries(food);
        const ingredients = keys
          .filter((key) => key[0].includes('strIngredient')
          && key[1] !== null && key[1] !== '');
        const instructions = keys
          .filter((key) => key[0].includes('strMeasure')
          && key[1] !== null);
        setfoodInProgress({ pathname, ...food, ingredients, instructions });
        if (!(JSON.parse(localStorage.getItem('inProgressRecipes')))) {
          saveInProgressStorage({ pathname, ...food, ingredients, instructions });
        }
        const Storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
        setListIngredients(Storage);
        setIsFavorite(alreadyExist(food.strMeal, Favorite));
      });
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((data) => data.json()).then((response) => {
        const food = response.drinks[0];
        const keys = Object.entries(food);
        const ingredients = keys
          .filter((key) => key[0].includes('strIngredient')
          && key[1] !== null && key[1] !== '');
        const instructions = keys
          .filter((key) => key[0].includes('strMeasure') && key[1] !== 0);
        setfoodInProgress({ pathname, ...food, ingredients, instructions });
        if (!(JSON.parse(localStorage.getItem('inProgressRecipes')))) {
          saveInProgressStorage({ pathname, ...food, ingredients, instructions });
        }
        const Storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
        setListIngredients(Storage);
        setIsFavorite(alreadyExist(food.strDrink, Favorite));
      });
    }
  }, []);

  const setNewStorage = (ingredient) => {
    const Storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const identifier = foodInProgress.idMeal || foodInProgress.idDrink;
    if (Storage[route][identifier].includes(ingredient)) {
      const newList = listIngredients[route][identifier]
        .filter((list) => list !== ingredient);
      const newInfos = {
        ...Storage,
        [route]: {
          [identifier]: newList,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInfos));
      return setListIngredients(newInfos);
    }
    Storage[route][identifier].push(ingredient);
    localStorage.setItem('inProgressRecipes', JSON.stringify(Storage));
    setListIngredients(Storage);
  };

  const shareLink = () => {
    clipboardCopy(`http://localhost:3000/${route}/${id}`);
    setLinkCopied(!linkCopied);
  };

  const verifyChecked = (ingredient) => {
    if (listIngredients[route]) {
      return !(listIngredients[route][id].includes(ingredient));
    }
  };

  const favoriteRecipes = () => {
    const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (isFavorite) {
      deleteFavorite(foodInProgress, Favorite);
      setIsFavorite(false);
    } else {
      const newFavorite = {
        id: foodInProgress.idMeal || foodInProgress.idDrink,
        type: pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: foodInProgress.strArea || '',
        category: foodInProgress.strCategory,
        alcoholicOrNot: foodInProgress.strAlcoholic || '',
        name: foodInProgress.strMeal || foodInProgress.strDrink,
        image: foodInProgress.strMealThumb || foodInProgress.strDrinkThumb,
      };
      recipesFavorite.push(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFavorite));
      setIsFavorite(true);
    }
  };

  const redirectToRecipeDone = () => {
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const dateNow = new Date();
    const newRecipeDone = {
      id: foodInProgress.idMeal || foodInProgress.idDrink,
      nationality: foodInProgress.strArea || '',
      name: foodInProgress.strMeal || foodInProgress.strDrink,
      category: foodInProgress.strCategory,
      image: foodInProgress.strMealThumb || foodInProgress.strDrinkThumb,
      tags: foodInProgress.strTags ? foodInProgress.strTags.split(',') : [],
      alcoholicOrNot: foodInProgress.strAlcoholic || '',
      type: pathname.includes('/meals') ? 'meal' : 'drink',
      doneDate: dateNow.toISOString(),
    };
    recipesDone.push(newRecipeDone);
    localStorage.setItem('doneRecipes', JSON.stringify(recipesDone));
    history.push('/done-recipes');
  };
  return (
    <>
      {foodInProgress && (
        <>
          {' '}
          <h2 data-testid="recipe-title">
            {' '}
            {foodInProgress.strMeal || foodInProgress.strDrink}
          </h2>
          <img
            src={ foodInProgress.strMealThumb || foodInProgress.strDrinkThumb }
            alt=""
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-category">
            {foodInProgress.strAlcoholic
             || foodInProgress.strCategory}
          </p>
          <p data-testid="instructions">{foodInProgress.strInstructions}</p>
          {foodInProgress.ingredients.map((ingredient, index) => (
            <label
              key={ `${index} - ${ingredient}` }
              data-testid={ `${index}-ingredient-step` }
              className={ verifyChecked(ingredient[1]) ? 'rasurado' : '' }
            >
              <input
                type="checkbox"
                checked={ verifyChecked(ingredient[1]) }
                onChange={ () => setNewStorage(ingredient[1]) }
              />
              { ingredient[1] }
            </label>
          ))}
        </>)}
      <button
        onClick={ () => shareLink() }
        data-testid="share-btn"
      >
        compartilhar

      </button>
      {linkCopied && <p>Link copied!</p>}

      <button
        onClick={ () => favoriteRecipes() }
      >
        <img
          src={ isFavorite
            ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
          alt="favoriteIcon"
        />

      </button>
      <button
        disabled={ listIngredients[route] && listIngredients[route][id].length !== 0 }
        onClick={ () => redirectToRecipeDone() }
        data-testid="finish-recipe-btn"
      >
        finalizar receita

      </button>
    </>
  );
}

RecipeInProgres.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
    push: propTypes.func.isRequired,
  }).isRequired,
};
export default RecipeInProgres;
