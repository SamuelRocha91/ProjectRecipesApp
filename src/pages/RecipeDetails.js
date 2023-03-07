import { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import ListIngredients from '../components/ListIngredients';
import CardRecipes from '../components/CardRecipes';
import { fetchApi } from '../services';
import CardDetails from '../components/CardDetails';
import './RecipeDetails.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { alreadyExist, deleteFavorite } from '../helpers/IsFavoriteLogic';

const urlNumber = 32;
const numberLimitIndex = 6;

function RecipeDetails({ match, history }) {
  // recupera o estado temporário com os dados da receita a se detalhar e a renderiza
  // Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes seguidos pelas quantidades, instruções, um vídeo do youtube incorporado e recomendações
  // { strMealThumb, strMeal, strCategory, strIngredient{1até máx 20}, strMeasure{1até máx 20}, strInstructions, strYoutube}
  // { strDrinkThumb, strDrink, strCategory, strAlcoholic, strIngredient1(ate o 15 no maximo, strMeasure1, strInstructions)}
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  const Favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const { foodDetails, setFoodDetails, setFoods, foods } = useContext(RecipesContext);
  const [linkCopied, setLinkCopied] = useState(false);

  const { location: { pathname } } = history;

  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    const { params: { id } } = match;
    if (pathname.includes('/meals')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((data) => data.json()).then((response) => {
        const food = response.meals[0];
        const keys = Object.entries(food);
        const ingredients = keys
          .filter((key) => key[0].includes('strIngredient')
          && key[1] !== null);
        const instructions = keys
          .filter((key) => key[0].includes('strMeasure')
          && key[1] !== null);
        setFoodDetails({ pathname, ...food, ingredients, instructions });
        setIsFavorite(alreadyExist(food.strMeal, Favorite));
      });

      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks', setFoods);
      setIsFavorite(alreadyExist(foodDetails, Favorite));
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((data) => data.json()).then((response) => {
        console.log(response);
        const food = response.drinks[0];
        const keys = Object.entries(food);
        const ingredients = keys
          .filter((key) => key[0].includes('strIngredient') && key[1] !== null);
        const instructions = keys
          .filter((key) => key[0].includes('strMeasure') && key[1] !== 0);
        setFoodDetails({ pathname, ...food, ingredients, instructions });
        setIsFavorite(alreadyExist(food.strDrink, Favorite));
      });
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals', setFoods);
    }
  }, []);

  const redirectToRecipeInProgress = () => {
    const { params: { id } } = match;
    if (pathname.includes('/meals')) {
      return history.push(`/meals/${id}/in-progress`);
    }
    history.push(`/drinks/${id}/in-progress`);
  };

  const favoriteRecipes = () => {
    const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (isFavorite) {
      deleteFavorite(foodDetails, Favorite);
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
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFavorite));
      setIsFavorite(true);
    }
  };

  const shareLink = () => {
    clipboardCopy(`http://localhost:3000${pathname}`);
    setLinkCopied(!linkCopied);
  };

  return (
    <div>
      <CardDetails />
      <ListIngredients />
      {foodDetails && (
        <p data-testid="instructions">{foodDetails.strInstructions}</p>
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
      <button
        data-testid="share-btn"
        onClick={ () => shareLink() }
      >
        Compartilhar

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

      <h2>Recomendações</h2>
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
                clik={ null }
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
};

export default RecipeDetails;
