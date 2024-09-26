import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import './CardDetails.css';

function CardDetails() {
  const { foodDetails } = useContext(RecipesContext);
  return (
    <div className="details-page">
      {foodDetails && (
        <div className="card-details-page">
          <h1>
            {foodDetails.strMeal || foodDetails.strDrink}
          </h1>
          <h2>
            {foodDetails.strAlcoholic
             || foodDetails.strCategory}
          </h2>
          <img
            src={ foodDetails.strMealThumb || foodDetails.strDrinkThumb }
            alt={ foodDetails.strCategory }
          />
        </div>
      )}
    </div>
  );
}

export default CardDetails;
