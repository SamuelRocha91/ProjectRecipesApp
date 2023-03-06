import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function CardDetails() {
  const { foodDetails } = useContext(RecipesContext);
  return (
    <div>
      {foodDetails && (
        <div>
          <h1
            data-testid="recipe-title"
          >
            {foodDetails.strMeal || foodDetails.strDrink}

          </h1>
          <h2 data-testid="recipe-category">
            {foodDetails.strAlcoholic
             || foodDetails.strCategory}

          </h2>
          <img
            src={ foodDetails.strMealThumb || foodDetails.strDrinkThumb }
            alt={ foodDetails.strCategory }
            data-testid="recipe-photo"
          />
        </div>
      )}
    </div>
  );
}

export default CardDetails;
