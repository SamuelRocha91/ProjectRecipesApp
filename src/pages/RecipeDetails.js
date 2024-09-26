import { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import ListIngredients from '../components/jsx/ListIngredients';
import CardRecipes from '../components/jsx/CardRecipes';
import { fetchApi } from '../services';
import CardDetails from '../components/jsx/CardDetails';
import './css/RecipeDetails.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { alreadyExist, deleteFavorite } from '../helpers/IsFavoriteLogic';
import { saveInProgressStorage } from '../helpers/saveStorage';
import './css/MainDetails.css';
import {
  DONE_RECIPES,
  FAVORITE_RECIPES,
  IN_PROGRESS,
  URL_ALL_DRINKS,
  URL_ALL_FOODS,
  URL_DETAIL_DRINK,
  URL_DETAIL_FOOD,
} from '../utils/constants';
import Header from '../components/jsx/Header';

const urlNumber = 32;
const numberLimitIndex = 6;

function RecipeDetails({ location, match, history }) {
  const doneRecipes = JSON.parse(localStorage.getItem(DONE_RECIPES)) || [];
  const inProgressRecipes = JSON.parse(localStorage.getItem(IN_PROGRESS)) || [];

  const { foodDetails, setFoodDetails, setFoods, foods } = useContext(RecipesContext);
  const [linkCopied, setLinkCopied] = useState(false);

  const { location: { pathname } } = history;

  const [isFavorite, setIsFavorite] = useState();

  const fetchApiDetails = (URL, id) => {
    fetch(`${URL}${id}`).then((data) => data.json()).then((response) => {
      const food = response.drinks ? response.drinks[0] : response.meals[0];
      const keys = Object.entries(food);
      const ingredients = keys
        .filter((key) => key[0].includes('strIngredient')
          && key[1] !== null && key[1] !== '');
      const instructions = keys
        .filter((key) => key[0].includes('strMeasure')
          && key[1] !== 0 && key[1] !== '');
      setFoodDetails({ pathname, ...food, ingredients, instructions }, () => {
        const Favorite = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
        setIsFavorite(alreadyExist(foodDetails, Favorite));
      });
    });
  };

  useEffect(() => {
    const { params: { id } } = match;
    if (pathname.includes('/meals')) {
      fetchApiDetails(URL_DETAIL_FOOD, id);
      fetchApi(URL_ALL_DRINKS, 'drinks', setFoods);
    } else {
      fetchApiDetails(URL_DETAIL_DRINK, id);
      fetchApi(URL_ALL_FOODS, 'meals', setFoods);
    }
  }, [location.pathname]);

  const redirectToRecipeInProgress = () => {
    saveInProgressStorage(foodDetails);
    const { params: { id } } = match;
    if (pathname.includes('/meals')) {
      return history.push(`/meals/${id}/in-progress`);
    }
    history.push(`/drinks/${id}/in-progress`);
  };

  const favoriteRecipes = () => {
    const recipesFavorite = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
    if (isFavorite) {
      deleteFavorite(foodDetails, recipesFavorite);
      setIsFavorite(false);
    } else {
      const newFavorite = {
        id: foodDetails.idMeal || foodDetails.idDrink,
        type: pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: foodDetails.strArea || '',
        category: foodDetails.strCategory,
        alcoholicOrNot: foodDetails.strAlcoholic || '',
        name: foodDetails.strMeal || foodDetails.strDrink,
        image: foodDetails.strMealThumb || foodDetails.strDrinkThumb,
      };
      recipesFavorite.push(newFavorite);
      localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(recipesFavorite));
      setIsFavorite(true);
    }
  };

  const detailRecipes = (id) => {
    if (location.pathname.includes('/meals')) {
      history.push(`/drinks/${id}`);
    } else {
      history.push(`/meals/${id}`);
    }
  };

  const shareLink = () => {
    clipboardCopy(`http://localhost:3000${pathname}`);
    setLinkCopied(!linkCopied);
  };

  return (
    <div>
      <Header title="Details" />
      <div className="details-main-content">
        <CardDetails />
        <ListIngredients />
        {foodDetails && (
          <p className="p-details">{foodDetails.strInstructions}</p>
        )}
        {foodDetails && foodDetails.strYoutube && (
          <iframe
            data-testid="video"
            width="420"
            height="315"
            src={ `https://www.youtube.com/embed/${foodDetails.strYoutube.slice(urlNumber)}` }
            title={ foodDetails.strMeal }
          />
        )}
        <div className="btns-actions">
          <button
            className="btns-shr"
            onClick={ () => shareLink() }
          >
            Compartilhar
          </button>
          {linkCopied && <p>Link copied!</p>}
          <button
            className="btns-shr"
            onClick={ () => favoriteRecipes() }
          >
            <img
              src={ isFavorite
                ? blackHeartIcon : whiteHeartIcon }
              alt="favoriteIcon"
            />
          </button>
        </div>
        <h2 className="recomendations">Recomendações</h2>
        <div className="cardRecipes">
          {foods && foods.drinks && foods.drinks.map((food, index) => {
            if (index < numberLimitIndex) {
              return (
                <CardRecipes
                  breadth="180px"
                  key={ `strDrink ${food.id}` }
                  idCard={ `${index}-recommendation-card` }
                  alt={ food.strDrink }
                  src={ food.strDrinkThumb }
                  idImg={ null }
                  idTitle={ `${index}-recommendation-title` }
                  title={ food.strDrink }
                  click={ () => detailRecipes(food.id) }
                />
              );
            }
            return null;
          })}
          {foods && foods.meals && foods.meals.map((food, index) => {
            if (index < numberLimitIndex) {
              return (
                <CardRecipes
                  breadth="180px"
                  key={ `strDrink ${food.id}` }
                  idCard={ `${index}-recommendation-card` }
                  alt={ food.strMeal }
                  src={ food.strMealThumb }
                  idImg={ null }
                  idTitle={ `${index}-recommendation-title` }
                  title={ food.strMeal }
                  click={ () => detailRecipes(food.id) }
                />
              );
            }
            return null;
          })}
        </div>
        { doneRecipes.length === 0
         && (
           <button
             className="btnFixed"
             data-testid="start-recipe-btn"
             onClick={ () => redirectToRecipeInProgress() }
           >
             { inProgressRecipes.length !== 0 ? 'Continue Recipe' : 'Start Recipe' }
           </button>) }
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
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
  location: propTypes.shape({
    pathname: propTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
