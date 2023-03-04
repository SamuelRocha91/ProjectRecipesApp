import { useEffect, useContext, useState } from 'react';
import propTypes from 'prop-types';
import { fetchCategories, fetchApi,
  fetchMealsByCategorie, fetchDrinksByCategorie } from '../services';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Recipes({ location, history }) {
  const { foods, setFoods, categories,
    setCategories, setFoodDetails, searchBarFetch,
    setSearchBarFetch } = useContext(RecipesContext);
  const [categorieSelected, setCategorieSelected] = useState(null); // estado que controla a última categoria a ter sido selecionada

  if (foods.length !== 0 && searchBarFetch) {
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

  const detailRecipes = (id, index) => {
    // função que redireciona o usuário para a página de detalhes
    if (location.pathname === '/meals') {
      const food = foods.meals[index];
      setFoodDetails([{ type: 'meals',
        id: food.id,
        name: food.strMeal,
        image: food.strMealThumb }]);
      history.push(`/meals/${id}`);
    } else {
      const food = foods.drinks[index];
      history.push(`/drinks/${id}`);
      setFoodDetails([{ type: 'drinks',
        id: food.id,
        name: food.strDrink,
        image: food.strDrinkThumb }]);
    }
  };

  return (
    <>
      <Header
        title={ location.pathname === '/meals' ? 'Meals' : 'Drinks' }
      />
      <div>
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
            onClick={ () => detailRecipes(food.id, index) }
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
            onClick={ () => detailRecipes(food.id, index) }
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
