import propTypes from 'prop-types';

function CardRecipes({ idCard, alt, src, idImg, idTitle, title, breadth }) {
  return (
    <div
      style={ { width: breadth,
      } }
      data-testid={ idCard }

    >
      <img src={ src } alt={ alt } data-testid={ idImg } />
      <p data-testid={ idTitle }>{title }</p>
    </div>
  );
}

CardRecipes.propTypes = {
  idCard: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  src: propTypes.string.isRequired,
  idImg: propTypes.string.isRequired,
  idTitle: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  breadth: propTypes.string.isRequired,
};

export default CardRecipes;
