import React from 'react';

function Login() {
  return (
    <form>
      <input
        type="text"
        name="email"
        data-testid="email-input"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        placeholder="Senha"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
