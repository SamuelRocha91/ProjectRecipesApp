# <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="Trybe Logo" width="52" height="30" /> Proyecto Recipes App <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="Trybe Logo" width="52" height="30" />

## 🌐 [![Português](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README.md) [![Español](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_es.md) [![English](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_en.md) [![Русский](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ru.md) [![中文](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ch.md) [![العربية](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ar.md)

![Vista previa de la aplicación](./public/recipesAppOne.gif)

Este proyecto fue desarrollado en el módulo de Front-End del curso de Desarrollo Web de Trybe. Consiste en una aplicación de recetas que permite a los usuarios buscar, visualizar, filtrar, agregar a favoritos y seguir el progreso de preparación de recetas de comidas y bebidas.

La aplicación fue desarrollada utilizando **React** con los recursos más modernos, como **Hooks** y **Context API**, garantizando una gestión eficiente del estado global de la aplicación. El diseño de la aplicación fue optimizado para dispositivos móviles.

La aplicación fue desarrollada con un enfoque en dispositivos móviles, con un diseño optimizado para pantallas de hasta **375px de ancho**. Para garantizar que la interfaz se visualice correctamente durante las pruebas, recomendamos utilizar las herramientas de desarrollo del navegador (DevTools), simulando la aplicación en resoluciones menores, como la de un smartphone. En Chrome, por ejemplo, puedes activar el **Modo de Vista de Dispositivos Móviles** presionando `Ctrl + Shift + M` en DevTools y ajustando el ancho de la pantalla a **375px**.

## Funcionalidades

- Buscar recetas de comidas y bebidas;
- Filtrar recetas por categoría;
- Ver detalles de las recetas, incluyendo ingredientes e instrucciones;
- Agregar y guardar recetas en favoritos;
- Seguir el progreso de la preparación de las recetas;
- Ver recetas ya finalizadas.

![Vista previa de la aplicación](./public/recipesAppTwo.gif)

La aplicación utiliza dos APIs distintas como base de datos:

1. [TheMealDB API](https://www.themealdb.com/api.php) para recetas de comidas;
2. [TheCocktailDB API](https://www.thecocktaildb.com/api.php) para recetas de bebidas.

## Tecnologías Utilizadas

- **React** para la creación de componentes e interfaz;
- **React Router** para la navegación entre las páginas;
- **Context API** para la gestión global del estado;
- **Hooks** para el control de ciclos de vida y estados locales;
- **Bootstrap** para la estilización y responsividad;
- **Docker** para garantizar portabilidad y consistencia en el entorno de desarrollo.

## Cómo Ejecutar el Proyecto

### Requisitos Previos

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
  ├── pages/               # Páginas principales de la aplicación (Login, Recetas, Favoritos, Perfil, etc.)
  ├── services/            # Lógica para solicitudes a las APIs
  ├── context/             # Configuración de Context API
  ├── App.js               # Componente principal que contiene las rutas
  └── index.js             # Punto de entrada de la aplicación
```

## Metodologías y Competencias Desarrolladas

Durante el desarrollo de este proyecto, se trabajaron las siguientes competencias:

- **Metodologías Ágiles**: Trabajo en equipo utilizando **Scrum** y **Trello** para gestionar tareas y funcionalidades;
- **React Routes**: Implementación de rutas dinámicas para navegar entre las diferentes páginas de la aplicación;
- **Lógica de Programación**: Desarrollo de funcionalidades de búsqueda, filtrado y manipulación de datos;
- **Manipulación de Estado**: Gestión del estado local y global con Hooks y Context API;
- **Creación de Componentes**: Desarrollo de componentes reutilizables y responsivos para diferentes partes de la aplicación.

## Pruebas

Las pruebas de la aplicación se pueden ejecutar con el comando:

```bash
npm test
```

## Otros proyectos

- 🐣 [Pokedex](https://github.com/SamuelRocha91/pokedex/blob/main/README_es.md)
- 🏪 [FrontEnd Online Store](https://github.com/SamuelRocha91/project-frontend-online-store/blob/main/README_es.md)
- 👛 [Expense organizer](https://github.com/SamuelRocha91/project-trybewallet/blob/main/README_es.md)
- 🎮 [Trivia](https://github.com/SamuelRocha91/trivia_game/blob/main/README_es.md)
- 🗡️ [Trybe Smith](https://github.com/SamuelRocha91/TrybeSmith/blob/main/README_es.md)
- 🪧 [Blogs Api](https://github.com/SamuelRocha91/BlogsApi/blob/main/README_es.md)
- 🐉 [Trybers and Dragons](https://github.com/SamuelRocha91/trybeAndDragons/blob/main/README_es.md)
- ⚽ [Typescript FootBall API](https://github.com/SamuelRocha91/trybeFutebolClube/blob/main/README_es.md)
