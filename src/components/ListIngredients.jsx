import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import './ListIngredientes.css';

function ListIngredients() {
  const { foodDetails } = useContext(RecipesContext);

  return (
    <ul className="u-list">
      {foodDetails !== null && foodDetails.ingredients.map((ingredient, index) => (
        <label
          className="label-ingredients"
          key={ `${foodDetails.instructions[index][1]}${index}` }
        >
          <li
            className="list-it"
            type="checkbox"
          >
            { ingredient[1]}
            <span className="span-ingredients">
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
