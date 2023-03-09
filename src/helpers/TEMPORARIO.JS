import { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function RecipeInProgres({ match }) {
  const { params: { id } } = match;

  const { foodDetails } = useContext(RecipesContext);

  const [foodInProgress, setfoodInProgress] = useState(undefined);
  const [listIngredients, setListIngredients] = useState(null);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
      .meals[id] || JSON.parse(localStorage.getItem('inProgressRecipes'))
      .drinks[id];
    setListIngredients(inProgress);
    setfoodInProgress({ ...foodDetails });
  }, []);

  const setNewStorage = (ingredient) => {
    const Storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const route = foodInProgress.pathname.includes('/meals') ? 'meals' : 'drinks';
    const identifier = foodInProgress.idMeal || foodInProgress.idDrink;
    if (Storage[route][identifier].includes(ingredient)) {
      const newList = listIngredients.filter((list) => list !== ingredient);
      const newInfos = {
        ...Storage,
        [route]: {
          [identifier]: newList,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInfos));
      return setListIngredients(newList);
    }
    Storage[route][identifier].push(ingredient);
    console.log(Storage);
    localStorage.setItem('inProgressRecipes', JSON.stringify(Storage));
    setListIngredients(Storage[route][identifier]);
  };
  console.log(listIngredients);

  return (
    <>
      {foodInProgress !== undefined && (
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
          {foodInProgress.ingredients.map((ingredient, index) => {
            if (ingredient[1] !== '' && ingredient[1] !== null) {
              return (
                <label
                  style={ !(listIngredients.includes(ingredient[1]))

                    ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                    : { textDecoration: 'none' } }
                  key={ `${index} - ${ingredient}` }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    checked={ !(listIngredients.includes(ingredient[1])) }
                    onChange={ () => setNewStorage(ingredient[1]) }
                  />
                  { ingredient[1] }
                </label>
              );
            } return null;
          })}
        </>)}
      <button data-testid="share-btn">compartilhar</button>
      <button data-testid="favorite-btn">favoritar</button>
      <button data-testid="finish-recipe-btn">finalizar receita</button>
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
