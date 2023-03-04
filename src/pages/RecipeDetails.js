import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails() {
  const { foodDetails } = useContext(RecipesContext);
  // recupera o estado temporário com os dados da receita a se detalhar e a renderiza
  return (
    <div>
      {foodDetails && foodDetails.map(({ image, name }) => (
        <img key={ name } src={ image } alt={ name } />
      ))}
    </div>
  );
}

export default RecipeDetails;
