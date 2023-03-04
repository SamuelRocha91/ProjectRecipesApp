import { useEffect, useContext, useState } from 'react';
import propTypes from 'prop-types';
import { fetchCategories, fetchApi,
  fetchMealsByCategorie, fetchDrinksByCategorie } from '../services';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Recipes({ location, history }) {
  const { foods, setFoods, categories, setCategories } = useContext(RecipesContext);
  const [categorieSelected, setCategorieSelected] = useState(null);

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
      fetchMealsByCategorie(categorie, setFoods, categorieSelected);
    } else {
      fetchDrinksByCategorie(categorie, setFoods, categorieSelected);
    }
    setCategorieSelected(categorie);
  };

  const detailRecipes = (id) => {
    if (location.pathname === '/meals') {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <div>
      <Header
        title={ location.pathname === '/meals' ? 'Meals' : 'Drinks' }

      />
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
        <div
          key={ `strMeal ${index}` }
          onClick={ () => detailRecipes(food.id) }
          data-testid={ `${index}-recipe-card` }
          role="presentation"
        >
          <img
            alt={ food.strMeal }
            src={ food.strMealThumb }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
        </div>
      ))}
      {foods && foods.drinks && foods.drinks.map((food, index) => (
        <div
          key={ `strDrink ${food.id}` }
          onClick={ () => detailRecipes(food.id) }
          role="presentation"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            alt={ food.strDrink }
            src={ food.strDrinkThumb }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ food.strDrink }</p>
        </div>
      ))}
    </div>
  );
}

Recipes.propTypes = {
  location: propTypes.shape({
    pathname: propTypes.string.isRequired,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Recipes;
