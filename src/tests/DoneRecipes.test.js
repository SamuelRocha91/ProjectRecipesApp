import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppProvider from '../context/AppProvider';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from '../helpers/renderWithRouter';

const route = '/done-recipes';
const name = '0-horizontal-name';
const share = '0-horizontal-share-btn';
const image1 = 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg';
const soup = 'soup vegetarian';
const link = 'Link copied!';

describe('Verifica se a rota "/donerecipes"', () => {
  const recipe = [{
    id: 5574,
    type: 'meal',
    nationality: 'jewish',
    category: 'soup',
    alcoholicOrNot: '',
    name: soup,
    image: image1,
    doneDate: '21/02/23',
    tags: ['vegetarian', 'soup', 'strong', 'fire', 'snow'],
  }];

  const recipeDrink = [{
    id: 8823,
    type: 'drink',
    nationality: 'russian',
    category: 'soup',
    alcoholicOrNot: '',
    name: 'vodka',
    image: image1,
    doneDate: '21/02/23',
    tags: [],
  }];

  const recipeDouble = [{
    id: 5574,
    type: 'meal',
    nationality: 'jewish',
    category: 'soup',
    alcoholicOrNot: '',
    name: soup,
    image: image1,
    doneDate: '21/02/23',
    tags: ['vegetarian', 'soup', 'strong', 'fire', 'snow'],
  },
  {
    id: 8823,
    type: 'drink',
    nationality: 'russian',
    category: 'soup',
    alcoholicOrNot: '',
    name: 'vodka',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '21/02/23',
    tags: [],
  }];

  test('renderiza todos os elementos resgatados do localStorage pertinentes a receita de almoços', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipe));
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route] },
    );
    expect(screen.getByTestId(name)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId(share)).toBeInTheDocument();
    expect(screen.getByTestId('0-vegetarian-horizontal-tag')).toBeInTheDocument();
  });
  test('renderiza todos os elementos resgatados do localStorage pertinentes a receita de drinks', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipeDrink));
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route] },
    );
    expect(screen.getByTestId(name)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId(share)).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão de compartilhar é renderizada uma confirmação da cópia na página', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipeDrink));
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route] },
    );
    expect(screen.getByTestId(name)).toBeInTheDocument();

    // mock implementado(do clipboard, bem como sua) a patir de https://stackoverflow.com/questions/61807378/jest-test-for-a-copy-to-clipboard-method-using-react-with-typescript, acesso 06/03/2023 às 22:26
    const mockedClipboard = jest.fn();

    navigator.clipboard = {
      writeText: mockedClipboard,
    };

    const shareBtn = screen.getByTestId(share);

    expect(shareBtn).toBeInTheDocument();

    expect(screen.queryByText(link)).not.toBeInTheDocument();

    userEvent.click(shareBtn);

    expect(mockedClipboard).toHaveBeenCalledTimes(1);
    expect(screen.getByText(link)).toBeInTheDocument();
  });
  test('verifica o funcionamento dos filtros', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipeDouble));
    const { debug } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route] },
    );
    expect(screen.getByTestId(name)).toBeInTheDocument();
    expect(screen.getByTestId(name)).toHaveTextContent('soup vegetarian');

    const all = screen.getByTestId('filter-by-all-btn');
    const meal = screen.getByTestId('filter-by-meal-btn');
    const drink = screen.getByTestId('filter-by-drink-btn');
    debug();
    userEvent.click(drink);
    expect(screen.queryByTestId(name)).not.toHaveTextContent(soup);

    userEvent.click(all);

    expect(screen.getByTestId(name)).toHaveTextContent(soup);

    userEvent.click(meal);

    expect(screen.queryByText('vodka')).not.toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão de compartilhar é renderizada uma confirmação da cópia na página', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipeDrink));
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route] },
    );
    expect(screen.getByTestId(name)).toBeInTheDocument();

    // mock implementado(do clipboard, bem como sua) a patir de https://stackoverflow.com/questions/61807378/jest-test-for-a-copy-to-clipboard-method-using-react-with-typescript, acesso 06/03/2023 às 22:26
    const mockedClipboard = jest.fn();

    navigator.clipboard = {
      writeText: mockedClipboard,
    };

    const shareBtn = screen.getByTestId(share);

    expect(screen.queryByText(link)).not.toBeInTheDocument();

    userEvent.click(shareBtn);

    expect(mockedClipboard).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});
