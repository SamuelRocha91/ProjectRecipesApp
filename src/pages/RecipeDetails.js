import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails() {
  const { foodDetails } = useContext(RecipesContext);
  return (
    <div>
      {foodDetails && foodDetails.map(({ image, name }) => (
        <img key={ name } src={ image } alt={ name } />
      ))}
    </div>
  );
}

export default RecipeDetails;
