'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/

const fetchData = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const fetchAndPopulatePokemons = async selectElement => {
  try {
    const data = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=151');
    data.results.forEach(pokemon => {
      const option = document.createElement('option');
      option.textContent = pokemon.name;
      option.value = pokemon.url;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchImage = async (imgElement, url) => {
  try {
    const data = await fetchData(url);
    imgElement.src = data.sprites.front_default;
  } catch (error) {
    console.error('Error:', error);
  }
};

const main = async () => {
  window.addEventListener('load', () => {
    const selectElement = document.createElement('select');
    const imgElement = document.createElement('img');
    const buttonElement = document.createElement('button');

    selectElement.classList.add('pokemon-select');
    imgElement.classList.add('pokemon-image');
    buttonElement.textContent = 'Fetch Pokemon';

    document.body.appendChild(selectElement);
    document.body.appendChild(imgElement);
    document.body.appendChild(buttonElement);

    selectElement.addEventListener('change', () => {
      fetchImage(imgElement, selectElement.value);
    });

    buttonElement.addEventListener('click', () => {
      fetchAndPopulatePokemons(selectElement);
    });
  });
};
main();
