import propTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const values = useMemo(() => ({
    foods, setFoods, categories, setCategories,
  }), [foods, setFoods, categories, setCategories]);
  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RecipesProvider;
