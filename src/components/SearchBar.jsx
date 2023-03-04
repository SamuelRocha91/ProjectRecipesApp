import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
      />
      <div className="radio-buttons-container">
        <label>
          Ingrediente
          <input
            type="radio"
            name="radio-buttons"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label>
          Name
          <input
            type="radio"
            name="radio-buttons"
            data-testid="name-search-radio"
          />
        </label>
        <label>
          First letter
          <input
            type="radio"
            name="radio-buttons"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <div>
        <button
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
