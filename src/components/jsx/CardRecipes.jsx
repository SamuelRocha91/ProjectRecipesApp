import propTypes from 'prop-types';

function CardRecipes({ alt, src, idTitle, title, breadth }) {
  return (
    <div
      className="recipe-card"
      style={ { width: breadth,
      } }
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
};

export default CardRecipes;
