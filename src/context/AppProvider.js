import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppContext';

function AppProvider({ children }) {
  const [searchIcon, setSearchIcon] = useState(true); // estado para controlar a renderização do icone de busca
  const [searchBox, setSearchBox] = useState(false); // estado para controlar a visibilidade da barra de pesquisa

  const context = useMemo(() => ({
    searchIcon,
    setSearchIcon,
    searchBox,
    setSearchBox,
  }), [searchIcon, setSearchIcon, searchBox, setSearchBox]);

  return (
    <appContext.Provider value={ context }>
      {children}
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppProvider;
