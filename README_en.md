
# <img src="https://cdn-icons-png.flaticon.com/128/10832/10832132.png" alt="React Logo" width="42" height="30" /> Project Recipes App <img src="https://cdn-icons-png.flaticon.com/128/10832/10832132.png" alt="React Logo" width="42" height="30" />

## 🌐 [![Português](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README.md) [![Español](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_es.md) [![English](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_en.md) [![Русский](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ru.md) [![中文](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ch.md) [![العربية](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ar.md)

![Application Preview](./public/recipesAppOne.gif)

This project was developed in the Front-End module of the Web Development course at Trybe. It consists of a recipe application that allows users to search for, view, filter, favorite, and track the progress of food and drink recipes.

The application was developed using **React** with the latest features such as **Hooks** and **Context API**, ensuring efficient management of the application's global state. The layout of the application is optimized for mobile devices.

The application was designed with a focus on mobile devices, featuring a layout optimized for screens up to **375px wide**. To ensure that the interface is displayed correctly during testing, it is recommended to use the browser's development tools (DevTools) to simulate the application on smaller resolutions, like that of a smartphone. In Chrome, for example, you can activate the **Device Mode** by pressing `Ctrl + Shift + M` in DevTools and adjusting the screen width to **375px**.

<details>
  <summary><h2>⚙️ Features</h2></summary>
  
  - Search for food and drink recipes;
  - Filter recipes by category;
  - View recipe details, including ingredients and instructions;
  - Favorite and save recipes;
  - Track the progress of recipe preparation;
  - View completed recipes.

</details>

![Application Preview](./public/recipesAppTwo.gif)

The application uses two distinct APIs as a database:

1. [TheMealDB API](https://www.themealdb.com/api.php) for food recipes;
2. [TheCocktailDB API](https://www.thecocktaildb.com/api.php) for drink recipes.

<details>
  <summary><h2>🛠️ Technologies Used</h2></summary>
  
  - **React** for creating components and interface;
  - **React Router** for navigation between pages;
  - **Context API** for global state management;
  - **Hooks** for managing lifecycle and local states;
  - **Bootstrap** for styling and responsiveness;
  - **Docker** to ensure portability and consistency in the development environment.

</details>

<details>
  <summary><h2>🚀 How to Run the Project</h2></summary>

  ### Prerequisites

  - **Node.js** installed on your machine (version 14 or higher);
  - **Docker** and **Docker Compose** installed (if you want to run the project with Docker).

  ### Cloning the Repository

  ```bash
  git clone https://github.com/seu-usuario/recipes-app.git
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

  3. Access the application in your browser:

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

  3. Access the application in your browser:

     ```
     http://localhost:3000
     ```

  ### Project Structure

  The project is organized as follows:

  ```bash
  src/
    ├── components/          # Reusable components
    ├── pages/               # Main application pages (Login, Recipes, Favorites, Profile, etc.)
    ├── services/            # Logic for API requests
    ├── context/             # Context API configuration
    ├── App.js               # Main component containing routes
    └── index.js             # Entry point of the application
  ```

</details>

<details>
  <summary><h2>📈 Methodologies and Skills Developed</h2></summary>

  During the development of this project, the following skills were worked on:

  - **Agile Methodologies**: Teamwork using **Scrum** and **Trello** to manage tasks and functionalities;
  - **React Routes**: Implementation of dynamic routes for navigating between different pages of the application;
  - **Programming Logic**: Development of search, filtering, and data manipulation functionalities;
  - **State Management**: Managing local and global state with Hooks and Context API;
  - **Component Creation**: Development of reusable and responsive components for different parts of the application.

</details>

<details>
  <summary><h2>🧪 Testing</h2></summary>

  The application tests can be run with the command:

  ```bash
  npm test
  ```

</details>

<details>
  <summary><h2>🌟 Other Projects</h2></summary>

  - 🐣 [Pokedex](https://github.com/SamuelRocha91/pokedex/blob/main/README_en.md)
  - 🏪 [FrontEnd Online Store](https://github.com/SamuelRocha91/project-frontend-online-store/blob/main/README_en.md)
  - 👛 [Expense Organizer](https://github.com/SamuelRocha91/project-trybewallet/blob/main/README_en.md)
  - 🎮 [Trivia](https://github.com/SamuelRocha91/trivia_game/blob/main/README_en.md)

</details>
