
# <img src="https://cdn-icons-png.flaticon.com/128/10832/10832132.png" alt="React Logo" width="42" height="30" /> Proyecto App de Recetas <img src="https://cdn-icons-png.flaticon.com/128/10832/10832132.png" alt="React Logo" width="42" height="30" />

## 🌐 [![Português](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README.md) [![Español](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_es.md) [![English](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_en.md) [![Русский](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ru.md) [![中文](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ch.md) [![العربية](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ar.md)

![Preview de la aplicación](./public/recipesAppOne.gif)

Este proyecto fue desarrollado en el módulo de Front-End del curso de Desarrollo Web de la Trybe. Consiste en una aplicación de recetas que permite a los usuarios buscar, visualizar, filtrar, favoritar y seguir el progreso de preparación de recetas de comidas y bebidas.

La aplicación fue desarrollada utilizando **React** con las herramientas más modernas, como **Hooks** y **Context API**, garantizando una gestión eficiente del estado global de la aplicación. El diseño de la aplicación ha sido optimizado para dispositivos móviles.

La aplicación fue desarrollada con un enfoque en dispositivos móviles, con un diseño optimizado para pantallas de hasta **375px de ancho**. Para garantizar que la interfaz se visualice correctamente durante las pruebas, recomendamos utilizar las herramientas de desarrollo del navegador (DevTools), simulando la aplicación en resoluciones más pequeñas, como la de un smartphone. En Chrome, por ejemplo, puedes activar el **Modo de Visualización para Dispositivos Móviles** presionando `Ctrl + Shift + M` en DevTools y ajustando el ancho de la pantalla a **375px**.

<details>
  <summary><h2>⚙️ Funcionalidades</h2></summary>
  
  - Buscar recetas de comidas y bebidas;
  - Filtrar recetas por categoría;
  - Ver detalles de las recetas, incluyendo ingredientes e instrucciones;
  - Favoritar y guardar recetas;
  - Seguir el progreso de la preparación de las recetas;
  - Ver recetas ya finalizadas.

</details>

![Preview de la aplicación](./public/recipesAppTwo.gif)

La aplicación utiliza dos APIs distintas como base de datos:

1. [TheMealDB API](https://www.themealdb.com/api.php) para recetas de comidas;
2. [TheCocktailDB API](https://www.thecocktaildb.com/api.php) para recetas de bebidas.

<details>
  <summary><h2>🛠️ Tecnologías Utilizadas</h2></summary>
  
  - **React** para la creación de componentes e interfaz;
  - **React Router** para la navegación entre las páginas;
  - **Context API** para la gestión global del estado;
  - **Hooks** para el control de ciclos de vida y estados locales;
  - **Bootstrap** para la estilización y responsividad;
  - **Docker** para garantizar portabilidad y consistencia en el entorno de desarrollo.

</details>

<details>
  <summary><h2>🚀 Cómo Ejecutar el Proyecto</h2></summary>

  ### Pre-requisitos

  - **Node.js** instalado en tu máquina (versión 14 o superior);
  - **Docker** y **Docker Compose** instalados (si deseas ejecutar el proyecto con Docker).

  ### Clonando el Repositorio

  ```bash
  git clone https://github.com/seu-usuario/recipes-app.git
  cd recipes-app
  ```

  ### Ejecutando el Proyecto Localmente (Sin Docker)

  1. Instala las dependencias del proyecto:

     ```bash
     npm install
     ```

  2. Inicia el servidor de desarrollo:

     ```bash
     npm start
     ```

  3. Accede a la aplicación en el navegador:

     ```
     http://localhost:3000
     ```

  ### Ejecutando el Proyecto con Docker

  1. Construye la imagen Docker:

     ```bash
     docker build -t recipes-app .
     ```

  2. Ejecuta el contenedor Docker:

     ```bash
     docker run -p 3000:3000 recipes-app
     ```

  3. Accede a la aplicación en el navegador:

     ```
     http://localhost:3000
     ```

  ### Estructura del Proyecto

  El proyecto está organizado de la siguiente manera:

  ```bash
  src/
    ├── components/          # Componentes reutilizables
    ├── pages/               # Páginas principales de la aplicación (Inicio de sesión, Recetas, Favoritos, Perfil, etc.)
    ├── services/            # Lógica para solicitudes a las APIs
    ├── context/             # Configuración de Context API
    ├── App.js               # Componente principal que contiene las rutas
    └── index.js             # Punto de entrada de la aplicación
  ```

</details>

<details>
  <summary><h2>📈 Metodologías y Competencias Desarrolladas</h2></summary>

  Durante el desarrollo de este proyecto, se trabajaron las siguientes competencias:

  - **Metodologías Ágiles**: Trabajo en equipo utilizando **Scrum** y **Trello** para gestionar tareas y funcionalidades;
  - **React Routes**: Implementación de rutas dinámicas para navegar entre las diferentes páginas de la aplicación;
  - **Lógica de Programación**: Desarrollo de funcionalidades de búsqueda, filtrado y manipulación de datos;
  - **Manipulación de Estado**: Gestión de estado local y global con Hooks y Context API;
  - **Creación de Componentes**: Desarrollo de componentes reutilizables y responsivos para diferentes partes de la aplicación.

</details>

<details>
  <summary><h2>🧪 Pruebas</h2></summary>

  Las pruebas de la aplicación pueden ejecutarse con el comando:

  ```bash
  npm test
  ```

</details>

<details>
  <summary><h2>🌟 Otros proyectos</h2></summary>

  - 🐣 [Pokedex](https://github.com/SamuelRocha91/pokedex/blob/main/README_es.md)
  - 🏪 [Tienda en Línea FrontEnd](https://github.com/SamuelRocha91/project-frontend-online-store/blob/main/README_es.md)
  - 👛 [Organizador de Gastos](https://github.com/SamuelRocha91/project-trybewallet/blob/main/README_es.md)
  - 🎮 [Trivia](https://github.com/SamuelRocha91/trivia_game/blob/main/README_es.md)

</details>
