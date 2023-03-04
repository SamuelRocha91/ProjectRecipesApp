import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchApi } from '../services';

function SearchBar() {
  const { setFoods } = useContext(RecipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const food = pathname === '/meals' ? 'meals' : 'drinks';

  const [search, setSearch] = useState({
    name: '',
    radioButtons: '',
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setSearch({ ...search, [name]: value });
  };

  const newRequest = () => {
    if (search.radioButtons === 'Ingredient') {
      const url = pathname === '/meals' ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search.name}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search.name}`;
      return fetchApi(url, food, setFoods);
    }
    if (search.radioButtons === 'Name') {
      const url = pathname === '/meals' ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.name}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search.name}`;
      return fetchApi(url, food, setFoods);
    }
    if (search.radioButtons === 'First' && search.name.length !== 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const url = pathname === '/meals' ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${search.name}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search.name}`;
    fetchApi(url, food, setFoods);
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        data-testid="search-input"
        value={ search.name }
        onChange={ handleChange }
      />
      <div className="radio-buttons-container">
        <label>
          Ingrediente
          <input
            type="radio"
            name="radioButtons"
            value="Ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
        </label>
        <label>
          Name
          <input
            type="radio"
            name="radioButtons"
            value="Name"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
        </label>
        <label>
          First letter
          <input
            type="radio"
            name="radioButtons"
            value="First"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
        </label>
      </div>
      <div>
        <button
          data-testid="exec-search-btn"
          onClick={ newRequest }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
