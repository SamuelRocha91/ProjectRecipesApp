import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import AppProvider from '../context/AppProvider';
import { renderWithRouter } from '../helpers/renderWithRouter';
import { meals, categoriesMeals, drinks, categoriesDrinks } from '../helpers/mockData';

const inputText = 'search-input';
const btnSearch = 'exec-search-btn';
const radioIngredient = 'ingredient-search-radio';
const radioName = 'name-search-radio';
const firstLetterRadio = 'first-letter-search-radio';

describe('Verifica se o componente SearchBar...', () => {
  test('não é renderizado logo após a rota de receitas ser carregada', () => {
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    expect(screen.queryByTestId(inputText)).not.toBeInTheDocument();
  });
  test('ao clicar no botão com uma lupa o SearchBar aparece', () => {
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[1]);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId(radioIngredient)).toBeInTheDocument();
    expect(screen.getByTestId(radioName)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetterRadio)).toBeInTheDocument();
    expect(screen.getByTestId(btnSearch)).toBeInTheDocument();
  });
  test('possibilita digitar no input e pesquisar por uma receita na rota "meals', async () => {
    jest.spyOn(global, 'fetch');
    jest.spyOn(global, 'alert');

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    });
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoriesMeals),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    });

    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );

    const meal = await screen.findByText('Corba');

    expect(meal).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[1]);

    const ingredient = screen.getByTestId(radioIngredient);

    expect(screen.getByTestId(inputText)).toBeInTheDocument();

    userEvent.type(screen.getByTestId(inputText), 'egg');
    userEvent.click(ingredient);
    userEvent.click(screen.getByTestId(btnSearch));

    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=egg');

    const burek = await screen.findByText('Burek');

    expect(burek).toBeInTheDocument();
    userEvent.clear(screen.getByTestId(inputText));
    userEvent.type(screen.getByTestId(inputText), 'apple');

    const name = screen.getByTestId(radioName);

    userEvent.click(name);
    userEvent.click(screen.getByTestId(btnSearch));

    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=apple');

    const Sushi = await screen.findByText('Sushi');

    expect(Sushi).toBeInTheDocument();
    userEvent.clear(screen.getByTestId(inputText));
    userEvent.type(screen.getByTestId(inputText), 'a');

    const letter = screen.getByTestId(firstLetterRadio);

    userEvent.click(letter);
    userEvent.click(screen.getByTestId(btnSearch));

    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');

    const Poutine = await screen.findByText('Poutine');

    expect(Poutine).toBeInTheDocument();

    userEvent.clear(screen.getByTestId(inputText));
    userEvent.type(screen.getByTestId(inputText), 'aa');

    userEvent.click(screen.getByTestId(btnSearch));

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('possibilita digitar no input e pesquisar por uma receita na rota "drinks"', async () => {
    jest.spyOn(global, 'fetch');
    jest.spyOn(global, 'alert');

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoriesDrinks),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });

    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );

    const GG = await screen.findByText('GG');

    expect(GG).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[1]);

    const ingredient = screen.getByTestId(radioIngredient);

    expect(screen.getByTestId(inputText)).toBeInTheDocument();

    userEvent.type(screen.getByTestId(inputText), 'vodka');
    userEvent.click(ingredient);
    userEvent.click(screen.getByTestId(btnSearch));

    expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka');

    const A1 = await screen.findByText('A1');

    expect(A1).toBeInTheDocument();
    userEvent.clear(screen.getByTestId(inputText));
    userEvent.type(screen.getByTestId(inputText), 'ice');

    const name = screen.getByTestId(radioName);

    userEvent.click(name);
    userEvent.click(screen.getByTestId(btnSearch));

    expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=ice');

    const ABC = await screen.findByText('ABC');

    expect(ABC).toBeInTheDocument();
    userEvent.clear(screen.getByTestId(inputText));
    userEvent.type(screen.getByTestId(inputText), 'a');

    const letter = screen.getByTestId(firstLetterRadio);

    userEvent.click(letter);
    userEvent.click(screen.getByTestId(btnSearch));

    expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');

    const Kir = await screen.findByText('Kir');

    expect(Kir).toBeInTheDocument();

    userEvent.clear(screen.getByTestId(inputText));
    userEvent.type(screen.getByTestId(inputText), 'aa');

    userEvent.click(screen.getByTestId(btnSearch));

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});
