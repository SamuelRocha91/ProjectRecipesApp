import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

function Recipes({ location }) {
  const [foods, setFoods] = useState([]);

  const fetchApi = (url, food) => {
    fetch(url).then((data) => data.json()).then((response) => {
      const maxRec = 12;
      if (food === 'meals') {
        const meals = response.meals
          .map(({ strMealThumb, strMeal }) => ({ strMealThumb, strMeal }))
          .filter((resp, index) => index < maxRec);
        setFoods({ meals });
      } else {
        const drinks = response.drinks
          .map(({ strDrinkThumb, strDrink }) => ({ strDrinkThumb, strDrink }))
          .filter((resp, index) => index < maxRec);
        setFoods({ drinks });
      }
    });
  };

  useEffect(() => {
    // esse componente é responsável por renderizar duas pages, conforme o README: /drinks ou a /meals
    const { pathname } = location;
    if (pathname === '/meals') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
    } else {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
    }
  }, []);

  return (
    <div>
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
