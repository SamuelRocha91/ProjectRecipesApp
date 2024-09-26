import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchApi } from '../services';
import './SearchBar.css';

function SearchBar() {
  const { setFoods, setSearchBarFetch } = useContext(RecipesContext);
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
      fetchApi(url, food, setFoods);
      return setSearchBarFetch(true);
    }
    if (search.radioButtons === 'Name') {
      const url = pathname === '/meals' ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.name}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search.name}`;
      fetchApi(url, food, setFoods);
      return setSearchBarFetch(true);
    }
    if (search.radioButtons === 'First' && search.name.length !== 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const url = pathname === '/meals' ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${search.name}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search.name}`;
    fetchApi(url, food, setFoods);
    setSearchBarFetch(true);
  };

  return (
    <div className="cards-search">
      <input
        type="text"
        name="name"
        placeholder="Type here"
        className="input-sb"
        value={ search.name }
        onChange={ handleChange }
      />
      <div className="radio-buttons-container">
        <label className="label-content">
          <div>Ingrediente</div>
          <input
            type="radio"
            name="radioButtons"
            value="Ingredient"
            onChange={ handleChange }
          />
        </label>
        <label className="label-content">
          <div>Name</div>
          <input
            type="radio"
            name="radioButtons"
            value="Name"
            onChange={ handleChange }
          />
        </label>
        <label className="label-content">
          <div>First letter</div>
          <input
            type="radio"
            name="radioButtons"
            value="First"
            onChange={ handleChange }
          />
        </label>
      </div>
      <div className="div-search-btn">
        <button
          onClick={ newRequest }
          className="search-btn-filter"
        >
          Apply filter
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
