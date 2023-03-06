import React from 'react';
import { Link } from 'react-router-dom';
import mealsImg from '../images/mealIcon.svg';
import drinksImg from '../images/drinkIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealsImg }
          alt="meals-icon"
        />
      </Link>
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinksImg }
          alt="drinks-icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
