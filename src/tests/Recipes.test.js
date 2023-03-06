import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { categoriesMeals, meals, beef, categoriesDrinks, drinks, shake, onemeal, oneDrink } from '../helpers/mockData';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from '../helpers/renderWithRouter';
import AppProvider from '../context/AppProvider';

const btnSearch = 'exec-search-btn';
const radioIngredient = 'ingredient-search-radio';
const inputText = 'search-input';

describe('Verifica se o componente "Recipes" na rota "/meals"...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    });
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoriesMeals),
    });
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('caso a requisição tenha sido feita pelo searchBar e o retorno da API tenha sido de apenas uma receita. verifica se há redirecionamento para a página de detalhes', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[1]);

    const ingredient = screen.getByTestId(radioIngredient);

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(onemeal),
    });

    userEvent.type(screen.getByTestId(inputText), 'egg');
    userEvent.click(ingredient);
    const buttonSearch = screen.getByTestId(btnSearch);
    userEvent.click(buttonSearch);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=egg');

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/meals/52977');
    });
  });

  test('renderiza doze receitas de almoços', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );

    const meal = await screen.findByText('Corba');
    expect(meal).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/meals');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    for (let index = 0; index < 12; index += 1) {
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
    }
  });
  test('renderiza cinco botões referentes a categorias filtradas pela Api e um para todas as categorias', async () => {
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

    for (let index = 0; index < 5; index += 1) {
      const categorie = categoriesMeals.meals[index].strCategory;
      expect(screen.getByTestId(`${categorie}-category-filter`))
        .toBeInTheDocument();
    }
    expect(screen.getByTestId('All-category-filter')).toHaveTextContent('All');
  });

  test('Verfica se ao clicar no filtro "Beef" e no filtro "all" a lista de drinks muda', async () => {
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );

    const meal = await screen.findByText('Timbits');
    expect(meal).toBeInTheDocument();

    const btnBeef = screen.getByText('Beef');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(beef),
    });

    userEvent.click(btnBeef);
    const beefMustard = await screen.findByText('Beef and Mustard Pie');

    expect(screen.queryByText('Timbits')).not.toBeInTheDocument();
    expect(beefMustard).toBeInTheDocument();
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    const all = screen.getByText('All');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    });

    userEvent.click(all);

    await waitFor(() => expect(screen.getByText('Timbits')).toBeInTheDocument());

    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  test('redireciona o usuário para uma rota de detalhes', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const Burek = await screen.findByText('Burek');
    expect(Burek).toBeInTheDocument();
    userEvent.click(Burek);
    expect(history.location.pathname).toBe('/meals/53060');
  });
});

describe('Verifica se o componente "Recipes" na rota "/drinks"...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoriesDrinks),
    });
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('caso a requisição tenha sido feita pelo searchBar e o retorno da API tenha sido de apenas uma receita. verifica se há redirecionamento para a página de detalhes', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[1]);

    const ingredient = screen.getByTestId(radioIngredient);

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    userEvent.type(screen.getByTestId(inputText), 'egg');
    userEvent.click(ingredient);
    const buttonSearch = screen.getByTestId(btnSearch);
    userEvent.click(buttonSearch);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=egg');

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/drinks/15997');
    });
  });

  test('Verfica se ao clicar no filtro "Shake" e no filtro "all" a lista de drinks muda', async () => {
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );

    const drink = await screen.findByText('GG');
    expect(drink).toBeInTheDocument();

    const btnShake = screen.getByText('Shake');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(shake),
    });

    userEvent.click(btnShake);
    const floridaShake = await screen.findByText('151 Florida Bushwacker');
    expect(drink).not.toBeInTheDocument();
    expect(floridaShake).toBeInTheDocument();
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake');

    const all = screen.getByText('All');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });

    userEvent.click(all);

    await waitFor(() => expect(screen.getByText('GG')).toBeInTheDocument());

    expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  test('redireciona o usuário para uma rota de detalhes', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    const drinKA1 = await screen.findByText('A1');
    expect(drinKA1).toBeInTheDocument();
    userEvent.click(drinKA1);
    expect(history.location.pathname).toBe('/drinks/17222');
  });

  test('renderiza doze receitas de bebidas', async () => {
    const { history, debug } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    const drink = await screen.findByText('GG');
    debug();

    expect(drink).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/drinks');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    for (let index = 0; index < 12; index += 1) {
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
    }
  });

  test('renderiza cinco botões referentes a categorias filtradas pela Api e um para todas as categorias', async () => {
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );

    const drink = await screen.findByText('GG');
    expect(drink).toBeInTheDocument();
    for (let index = 0; index < 5; index += 1) {
      const categorie = categoriesDrinks.drinks[index].strCategory;
      expect(screen.getByTestId(`${categorie}-category-filter`))
        .toBeInTheDocument();
    }

    expect(screen.getByTestId('All-category-filter')).toHaveTextContent('All');
  });
});
