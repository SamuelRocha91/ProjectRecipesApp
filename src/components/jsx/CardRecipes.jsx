import propTypes from 'prop-types';

function CardRecipes({ alt, src, idTitle, title, breadth, click }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      click();
    }
  };
  return (
    <div
      key={ idTitle }
      className="recipe-card"
      style={ { width: breadth } }
      role="button"
      onClick={ click }
      tabIndex="0"
      onKeyPress={ handleKeyPress }
    >
      <img src={ src } alt={ alt } />
      <p data-testid={ idTitle }>{title }</p>
    </div>
  );
}

CardRecipes.propTypes = {
  alt: propTypes.string.isRequired,
  src: propTypes.string.isRequired,
  idTitle: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  breadth: propTypes.string.isRequired,
  click: propTypes.func.isRequired,
};

export default CardRecipes;
