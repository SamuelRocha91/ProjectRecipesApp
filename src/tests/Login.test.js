import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Testes da pagina de Login', () => {
  it('Testa se existem 2 inputs na tela e um botão', () => {
    render(<Login />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Testa se ao digitar um email e senha válidos o botão é habilitado', () => {
    render(<Login />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'teste@trybe.com');
    userEvent.type(inputPassword, 'receitas');

    expect(loginButton).toBeEnabled();
  });
});
