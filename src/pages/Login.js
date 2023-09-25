import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
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

    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <section>
      <div id="bg">
        <img id="coracao" alt="coração" src={ coracao } />
        <img id="vetorone" alt="vetor1" src={ vetor } />
        <img id="vetortwo" alt="vetor2" src={ newVector } />
        <img id="vetor" alt="vetor" src={ tampa } />
        <img id="stroke" alt="stroke" src={ stroke } />
        <img src={ elipse } id="elipse" alt="elipse" />
        <img src={ tomate } id="tomate" alt="tomates" />
        <img src={ retangle } id="retangle" alt="retangle" />
        <img src={ recipes } id="recipes" alt="recipes" />
        <img src={ app } id="app" alt="app" />
      </div>
      <div>
        <h1>Login</h1>
      </div>
      <form>
        <input
          id="inputone"
          type="text"
          name="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ handleChange }
        />
        <input
          id="inputwo"
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ handleChange }
        />
        <Link to="/meals">
          <button
            type="button"
            data-testid="login-submit-btn"
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
