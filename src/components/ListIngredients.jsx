import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function ListIngredients() {
  const { foodDetails } = useContext(RecipesContext);

  return (
    <ul>
      {foodDetails !== null && foodDetails.ingredients.map((ingredient, index) => (
        <label
          key={ foodDetails.strMeal || foodDetails.strAlcoholic }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          <input
            type="checkbox"
          />
          { ingredient[1]}
          <span>
            {' '}
            {foodDetails.instructions[index][1] !== null
            && `${foodDetails.instructions[index][1]} ${ingredient[1]}` }

          </span>
        </label>
      ))}
    </ul>
  );
}

export default ListIngredients;
