import React, { useEffect, useState } from 'react';

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
    <form>
      <input
        type="text"
        name="email"
        data-testid="email-input"
        placeholder="Email"
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        placeholder="Senha"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
