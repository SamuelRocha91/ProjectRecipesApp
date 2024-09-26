/* eslint-disable complexity */
import { useEffect, useContext, useState } from 'react';
import propTypes from 'prop-types';
import { fetchCategories, fetchApi,
  fetchMealsByCategorie, fetchDrinksByCategorie,
} from '../services';
import appContext from '../context/AppContext';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/jsx/Header';
import Footer from '../components/jsx/Footer';
import SearchBar from '../components/jsx/SearchBar';
import './css/Recipes.css';
import {
  URL_ALL_DRINKS,
  URL_ALL_FOODS,
  URL_DRINK_BY_CATEGORY,
  URL_FOOD_BY_CATEGORY,
} from '../utils/constants';

function Recipes({ location, history }) {
  const {
    foods,
    setFoods,
    categories,
    setCategories,
    searchBarFetch,
    setSearchBarFetch,
  } = useContext(RecipesContext);
  const { searchBox } = useContext(appContext);
  const [categorieSelected, setCategorieSelected] = useState(null);

  if ((foods.meals || foods.drinks) && searchBarFetch) {
    if (location.pathname === '/drinks' && foods.drinks && foods.drinks.length === 1) {
      setSearchBarFetch(false);
      history.push(`/drinks/${foods.drinks[0].id}`);
    }

    if (location.pathname === '/meals' && foods.meals && foods.meals.length === 1) {
      setSearchBarFetch(false);
      history.push(`/meals/${foods.meals[0].id}`);
    }
  }
  useEffect(() => {
    if (location.pathname === '/meals') {
      fetchApi(URL_ALL_FOODS, 'meals', setFoods);
      fetchCategories(URL_FOOD_BY_CATEGORY, 'meals', setCategories);
    } else {
      fetchApi(URL_ALL_DRINKS, 'drinks', setFoods);
      fetchCategories(URL_DRINK_BY_CATEGORY, 'drinks', setCategories);
    }
  }, [location.pathname, setFoods, setCategories]);

  const filterResults = (categorie) => {
    // função que faz uma requisição para a api de acordo com a categoria da comida que o usuário quer acessar
    if (location.pathname === '/meals') {
      setSearchBarFetch(false);
      fetchMealsByCategorie(categorie, setFoods, categorieSelected);
    } else {
      setSearchBarFetch(false);
      fetchDrinksByCategorie(categorie, setFoods, categorieSelected);
    }
    setSearchBarFetch(false);
    setCategorieSelected(categorie);
  };

  const detailRecipes = (id) => {
    // função que redireciona o usuário para a página de detalhes
    if (location.pathname === '/meals') {
      setFoods([]);
      history.push(`/meals/${id}`);
    } else {
      setFoods([]);
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <>
      <Header
        title={ location.pathname === '/meals' ? 'Meals' : 'Drinks' }
      />
      <div className="card-recipes-content">
        <div className="filter-content">
          { searchBox
         && <SearchBar /> }
          {categories && categories.map((categorie, index) => (
            <button
              onClick={ () => filterResults(categorie) }
              key={ `${categorie} ${index}` }
              className="categories-main"
            >
              {categorie}

            </button>
          ))}
          <button
            onClick={ () => filterResults('all') }
            className="categories-main"
          >
            All
          </button>
        </div>
        <div className="card-recipes-md">
          {foods && foods.meals && foods.meals.map((food, index) => (
            <div
              key={ `strMeal ${index}` }
              onClick={ () => detailRecipes(food.id) }
              role="presentation"
              className="fooodddd"
            >
              <img
                alt={ food.strMeal }
                src={ food.strMealThumb }
              />
              <p>{ food.strMeal }</p>
            </div>
          ))}

          {foods && foods.drinks && foods.drinks.map((food) => (
            <div
              key={ `strDrink ${food.id}` }
              onClick={ () => detailRecipes(food.id) }
              role="presentation"
              className="fooodddd"
            >
              <img
                alt={ food.strDrink }
                src={ food.strDrinkThumb }
              />
              <p>{ food.strDrink }</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
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
