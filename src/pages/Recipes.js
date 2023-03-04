import { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCategories, fetchApi,
  fetchMealsByCategorie, fetchDrinksByCategorie } from '../services';
import RecipesContext from '../context/RecipesContext';

function Recipes({ location }) {
  const { foods, setFoods, categories, setCategories } = useContext(RecipesContext);

  useEffect(() => {
    // esse componente é responsável por renderizar duas pages, conforme o README: /drinks ou a /meals.

    if (location.pathname === '/meals') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals', setFoods);
      fetchCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'meals', setCategories);
    } else {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks', setFoods);
      fetchCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', 'drinks', setCategories);
    }
  }, [location.pathname]);

  const filterResults = (categorie) => {
    if (location.pathname === '/meals') {
      fetchMealsByCategorie(categorie, setFoods);
    } else {
      fetchDrinksByCategorie(categorie, setFoods);
    }
  };

  return (
    <div>
      { location.pathname === '/meals' && <Header title="Meals" /> }
      { location.pathname === '/drinks' && <Header title="Drinks" />}
      {categories && categories.map((categorie, index) => (
        <button
          onClick={ () => filterResults(categorie) }
          key={ `${categorie} ${index}` }
          data-testid={ `${categorie}-category-filter` }
        >
          {categorie}

        </button>
      ))}
      <button
        onClick={ () => filterResults('all') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {foods && foods.meals && foods.meals.map((food, index) => (
        <div key={ `strMeal ${index}` } data-testid={ `${index}-recipe-card` }>
          <img
            alt={ food.strMeal }
            src={ food.strMealThumb }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
        </div>
      ))}
      {foods && foods.drinks && foods.drinks.map(({ strDrinkThumb, strDrink }, index) => (
        <div key={ `strDrink ${index}` } data-testid={ `${index}-recipe-card` }>
          <img
            alt={ strDrink }
            src={ strDrinkThumb }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
        </div>
      ))}
    </div>
  );
}

Recipes.propTypes = {
  location: propTypes.shape({
    pathname: propTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
