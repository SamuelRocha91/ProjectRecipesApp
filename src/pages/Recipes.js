import { useEffect, useContext, useState } from 'react';
import propTypes from 'prop-types';
import { fetchCategories, fetchApi,
  fetchMealsByCategorie, fetchDrinksByCategorie,
} from '../services';
import appContext from '../context/AppContext';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import './Recipes.css';

function Recipes({ location, history }) {
  const { foods, setFoods, categories,
    setCategories, searchBarFetch,
    setSearchBarFetch } = useContext(RecipesContext);
  const {
    searchBox,
  } = useContext(appContext);
  const [categorieSelected, setCategorieSelected] = useState(null); // estado que controla a última categoria a ter sido selecionada

  if ((foods.meals || foods.drinks) && searchBarFetch) {
    // aqui o objetivo é filtrar se a requisição foi feita pelo searchBar e se retornou apenas uma receita
    if (location.pathname === '/drinks' && foods.drinks.length === 1) {
      setSearchBarFetch(false);
      history.push(`/drinks/${foods.drinks[0].id}`);
    }

    if (location.pathname === '/meals' && foods.meals.length === 1) {
      setSearchBarFetch(false);
      history.push(`/meals/${foods.meals[0].id}`);
    }
  }
  useEffect(() => {
    // esse componente é responsável por renderizar duas pages, conforme o README: /drinks ou a /meals com 12 receitas originais.
    // a função recebe a url, a rota e a função que vai manipular os dados retornados

    if (location.pathname === '/meals') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals', setFoods);
      fetchCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'meals', setCategories);
    } else {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks', setFoods);
      fetchCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', 'drinks', setCategories);
    }
  }, [location.pathname]);

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
