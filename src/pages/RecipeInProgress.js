import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import '../App.css';
import clipboardCopy from 'clipboard-copy';
import { saveInProgressStorage } from '../helpers/saveStorage';
import { deleteFavorite, alreadyExist } from '../helpers/IsFavoriteLogic';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './RecipesInProgress.css';
import {
  DONE_RECIPES,
  FAVORITE_RECIPES,
  IN_PROGRESS_RECIPES,
  URL_BASE,
  URL_DETAIL_DRINK,
  URL_DETAIL_FOOD,
} from '../utils/constants';

function RecipeInProgres({ match, history }) {
  const { location: { pathname } } = history;
  const { params: { id } } = match;

  const route = pathname.includes('/meals') ? 'meals' : 'drinks';
  const Favorite = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];

  const [foodInProgress, setfoodInProgress] = useState(undefined);
  const [listIngredients, setListIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState();
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (pathname.includes('/meals')) {
      fetch(`${URL_DETAIL_FOOD}${id}`).then((data) => data.json()).then((response) => {
        const food = response.meals[0];
        const keys = Object.entries(food);
        const ingredients = keys
          .filter((key) => key[0].includes('strIngredient')
          && key[1] !== null && key[1] !== '');
        const instructions = keys
          .filter((key) => key[0].includes('strMeasure')
          && key[1] !== null);
        setfoodInProgress({ pathname, ...food, ingredients, instructions });
        if (!(JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES)))) {
          saveInProgressStorage({ pathname, ...food, ingredients, instructions });
        }
        const Storage = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES)) || [];
        setListIngredients(Storage);
        setIsFavorite(alreadyExist(food.strMeal, Favorite));
      });
    } else {
      fetch(`${URL_DETAIL_DRINK}=${id}`).then((data) => data.json()).then((response) => {
        const food = response.drinks[0];
        const keys = Object.entries(food);
        const ingredients = keys
          .filter((key) => key[0].includes('strIngredient')
          && key[1] !== null && key[1] !== '');
        const instructions = keys
          .filter((key) => key[0].includes('strMeasure') && key[1] !== 0);
        setfoodInProgress({ pathname, ...food, ingredients, instructions });
        if (!(JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES)))) {
          saveInProgressStorage({ pathname, ...food, ingredients, instructions });
        }
        const Storage = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES)) || [];
        setListIngredients(Storage);
        setIsFavorite(alreadyExist(food.strDrink, Favorite));
      });
    }
  }, []);

  const setNewStorage = (ingredient) => {
    const Storage = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));
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
      localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(newInfos));
      return setListIngredients(newInfos);
    }
    Storage[route][identifier].push(ingredient);
    localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(Storage));
    setListIngredients(Storage);
  };

  const shareLink = () => {
    clipboardCopy(`${URL_BASE}${route}/${id}`);
    setLinkCopied(!linkCopied);
  };

  const verifyChecked = (ingredient) => {
    if (listIngredients[route]) {
      return !(listIngredients[route][id].includes(ingredient));
    }
  };

  const favoriteRecipes = () => {
    const recipesFavorite = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
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
      localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(recipesFavorite));
      setIsFavorite(true);
    }
  };

  const redirectToRecipeDone = () => {
    const recipesDone = JSON.parse(localStorage.getItem(DONE_RECIPES)) || [];
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
    <div>
      {foodInProgress && (
        <div className="recipe-in-progress">
          <h2>
            {foodInProgress.strMeal || foodInProgress.strDrink}
          </h2>
          <img
            src={ foodInProgress.strMealThumb || foodInProgress.strDrinkThumb }
            alt=""
          />
          <p>
            {foodInProgress.strAlcoholic || foodInProgress.strCategory}
          </p>
          <p className="instructions">
            {foodInProgress.strInstructions}
          </p>
          {foodInProgress.ingredients.map((ingredient, index) => (
            <label
              key={ `${index} - ${ingredient}` }
              className={ verifyChecked(ingredient[1]) ? 'rasurado' : '' }
            >
              <input
                type="checkbox"
                checked={ verifyChecked(ingredient[1]) }
                onChange={ () => setNewStorage(ingredient[1]) }
              />
              {ingredient[1]}
            </label>
          ))}
          <button onClick={ () => shareLink() }>
            compartilhar
          </button>
          {linkCopied && <p>Link copied!</p>}
          <button onClick={ () => favoriteRecipes() }>
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="favoriteIcon"
            />
          </button>
          <button
            disabled={ listIngredients[route] && listIngredients[route][id].length !== 0 }
            onClick={ () => redirectToRecipeDone() }
          >
            finalizar receita
          </button>
        </div>
      )}
    </div>
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
