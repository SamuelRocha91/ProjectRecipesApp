# <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="Trybe Logo" width="52" height="30" /> Project Recipes App <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="Trybe Logo" width="52" height="30" />


## 🌐 [![Português](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README.md) [![Español](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_es.md) [![English](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_en.md) [![Русский](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ru.md) [![中文](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ch.md) [![العربية](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ar.md)

![App Preview](./public/recipesAppOne.gif)


This project was developed during the Front-End module of Trybe's Web Development course. It consists of a recipe app that allows users to search, view, filter, favorite, and track the progress of food and drink recipe preparation.

The app was built using **React** with modern features such as **Hooks** and **Context API**, ensuring efficient management of the application's global state. The layout of the app is optimized for mobile devices.

The application was developed with a focus on mobile devices, optimized for screens up to **375px wide**. To ensure the interface is properly viewed during testing, we recommend using browser development tools (DevTools), simulating the application in smaller resolutions, such as a smartphone. In Chrome, for example, you can activate **Mobile View Mode** by pressing `Ctrl + Shift + M` in DevTools and adjusting the screen width to **375px**.

## Features

- Search for food and drink recipes;
- Filter recipes by category;
- View recipe details, including ingredients and instructions;
- Favorite and save recipes;
- Track the progress of recipe preparation;
- View completed recipes.

![App Preview](./public/recipesAppTwo.gif)

The application uses two distinct APIs as the data source:

1. [TheMealDB API](https://www.themealdb.com/api.php) for food recipes;
2. [TheCocktailDB API](https://www.thecocktaildb.com/api.php) for drink recipes.

## Technologies Used

- **React** for component creation and UI;
- **React Router** for navigation between pages;
- **Context API** for global state management;
- **Hooks** for lifecycle and local state management;
- **Bootstrap** for styling and responsiveness;
- **Docker** to ensure portability and consistency in the development environment.

## How to Run the Project

### Prerequisites

- **Node.js** installed on your machine (version 14 or higher);
- **Docker** and **Docker Compose** installed (if you want to run the project with Docker).

### Cloning the Repository

```bash
git clone https://github.com/your-username/recipes-app.git
cd recipes-app
```

### Running the Project Locally (Without Docker)

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Access the app in your browser:

   ```
   http://localhost:3000
   ```

### Running the Project with Docker

1. Build the Docker image:

   ```bash
   docker build -t recipes-app .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 recipes-app
   ```

3. Access the app in your browser:

   ```
   http://localhost:3000
   ```

### Project Structure

The project is organized as follows:

```bash
src/
  ├── components/          # Reusable components
  ├── pages/               # Main pages of the app (Login, Recipes, Favorites, Profile, etc.)
  ├── services/            # API request logic
  ├── context/             # Context API configuration
  ├── App.js               # Main component containing routes
  └── index.js             # Application entry point
```

## Methodologies and Competencies Developed

During the development of this project, the following skills were developed:

- **Agile Methodologies**: Teamwork using **Scrum** and **Trello** to manage tasks and features;
- **React Routes**: Implementation of dynamic routes to navigate between different pages of the application;
- **Programming Logic**: Development of search, filtering, and data manipulation features;
- **State Management**: Local and global state management using Hooks and Context API;
- **Component Creation**: Development of reusable and responsive components for different parts of the application.

## Tests

You can run the app tests with the command:

```bash
npm test
```

## Other Projects

- 🐣 [Pokedex](https://github.com/SamuelRocha91/pokedex/blob/main/README_en.md)
- 🏪 [FrontEnd Online Store](https://github.com/SamuelRocha91/project-frontend-online-store/blob/main/README_en.md)
- 👛 [Expense organizer](https://github.com/SamuelRocha91/project-trybewallet/blob/main/README_en.md)
- 🎮 [Trivia](https://github.com/SamuelRocha91/trivia_game/blob/main/README_en.md)
- 🗡️ [Trybe Smith](https://github.com/SamuelRocha91/TrybeSmith/blob/main/README_en.md)
- 🪧 [Blogs Api](https://github.com/SamuelRocha91/BlogsApi/blob/main/README_en.md)
- 🐉 [Trybers and Dragons](https://github.com/SamuelRocha91/trybeAndDragons/blob/main/README_en.md)
- ⚽ [Typescript FootBall API](https://github.com/SamuelRocha91/trybeFutebolClube/blob/main/README_en.md)

