import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function ListIngredients() {
  const { foodDetails } = useContext(RecipesContext);

  return (
    <ul>
      {foodDetails !== null && foodDetails.ingredients.map((ingredient, index) => (
        <label
          key={ `${foodDetails.instructions[index][1]}${index}` }
        >
          <li
            type="checkbox"
          >
            { ingredient[1]}
            <span>
              {' '}
              {foodDetails.instructions[index][1] !== null
            && `${foodDetails.instructions[index][1]}` }
            </span>
          </li>

        </label>
      ))}
    </ul>
  );
}

export default ListIngredients;
