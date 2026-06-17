import './styles.css';
import countriesData from './countries.json';
import { fetchCountryData, extractCountryData } from './api.js';
import {
  setupDropdownOptions,
  filterDropdownOptions,
  handleDropdownSelection,
  displayData,
} from './ui.js';

const searchBox = document.getElementById('selected-country');
const countryList = document.getElementById('countries-list');
const searchForm = document.getElementById('search-form');
const errorBox = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const loader = document.getElementById('loader');
const dashboard = document.getElementById('dashboard-display');
const welcome = document.getElementById('welcome-message');

setupDropdownOptions(countriesData);

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  errorBox.classList.remove('hidden-element');
  errorText.textContent = 'Please select a country from the dropdown list.';
  dashboard.classList.add('hidden-element');
  welcome.classList.add('hidden-element');
});

searchBox.addEventListener('input', filterDropdownOptions);

countryList.addEventListener('click', async (event) => {
  const chosenCountry = handleDropdownSelection(event);

  if (chosenCountry) {
    loader.classList.remove('hidden-element');
    dashboard.classList.add('hidden-element');
    welcome.classList.add('hidden-element');
    errorBox.classList.add('hidden-element');

    try {
      const rawData = await fetchCountryData(chosenCountry);
      const cleanData = extractCountryData(rawData);
      if (cleanData) {
        displayData(cleanData);
      } else {
        throw new Error('No data found');
      }
    } catch (error) {
      console.error('Failed execution cycle:', error.message);
      errorBox.classList.remove('hidden-element');
      document.getElementById('error-text').textContent =
        `Could not find data for ${chosenCountry}.`;
    } finally {
      loader.classList.add('hidden-element');
    }
  }
});
