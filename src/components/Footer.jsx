import React from 'react';
import { Link } from 'react-router-dom';
import mealsImg from '../images/mealIcon.svg';
import drinksImg from '../images/drinkIcon.svg';

// reenvio
function Footer() {
  return (
    <footer
      style={ {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#41197F',
        bottom: '0',
        padding: 15,
        width: '100%',
      } }
    >
      <Link to="/meals">
        <img
          className="mealsicon"
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
