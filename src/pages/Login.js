import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Login.css';
import tomate from '../images/tomate.png';
import elipse from '../images/Ellipse 1.png';
import coracao from '../images/coracao.png';
import vetor from '../images/Vector3.png';
import newVector from '../images/vetor2.png';
import tampa from '../images/Vector.png';
import stroke from '../images/stroke.png';
import retangle from '../images/Rectangle 2.png';
import recipes from '../images/Recipes.png';
import app from '../images/App.png';
import { USER } from '../utils/constants';

function Login() {
  const loginState = {
    email: '',
    password: '',
  };

  const [login, setLogin] = useState(loginState);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  useEffect(() => {
    // regex para validar email: https://horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const validateInputs = () => {
      const { email, password } = login;
      const minPasswordLength = 6;
      const emailRegex = (/\S+@\S+\.\S+/);
      const passwordValidation = password.length > minPasswordLength;

      if (emailRegex.test(email) && passwordValidation) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    validateInputs();
  }, [login]);

  const handleSubmit = () => {
    const user = {
      email: login.email,
    };

    localStorage.setItem(USER, JSON.stringify(user));
  };

  return (
    <section className="section-login">
      <div id="bg">
        <img className="coracao" alt="coração" src={ coracao } />
        <img className="vetorone" alt="vetor1" src={ vetor } />
        <img className="vetortwo" alt="vetor2" src={ newVector } />
        <img className="vetor" alt="vetor" src={ tampa } />
        <img className="stroke" alt="stroke" src={ stroke } />
        <img src={ elipse } className="elipse" alt="elipse" />
        <img src={ tomate } className="tomate" alt="tomates" />
        <img src={ retangle } className="retangle" alt="retangle" />
        <img src={ recipes } className="recipes" alt="recipes" />
        <img src={ app } className="app" alt="app" />
      </div>
      <div className="title-h1">
        <h1>Login</h1>
      </div>
      <form>
        <input
          className="inputone"
          type="text"
          name="email"
          placeholder="Email"
          onChange={ handleChange }
        />
        <input
          className="inputwo"
          type="password"
          name="password"
          placeholder="Senha"
          onChange={ handleChange }
        />
        <Link to="/meals">
          <button
            className="btn-login"
            type="button"
            disabled={ isDisabled }
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Login;
