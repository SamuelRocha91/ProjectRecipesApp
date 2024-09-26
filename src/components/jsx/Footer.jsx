import React from 'react';
import { Link } from 'react-router-dom';
import mealsImg from '../../images/mealIcon.svg';
import drinksImg from '../../images/drinkIcon.svg';
import '../css/Footer.css';

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
      } }
    >
      <Link to="/meals">
        <img
          className="mealsicon"
          src={ mealsImg }
          alt="meals-icon"
        />
      </Link>
      <Link to="/drinks">
        <img
          className="drinkicon"
          src={ drinksImg }
          alt="drinks-icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
