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

setupDropdownOptions(countriesData);

searchBox.addEventListener('input', filterDropdownOptions);
countryList.addEventListener('click', async (event) => {
  const chosenCountry = handleDropdownSelection(event);

  if (chosenCountry) {
    const loader = document.getElementById('loader');
    const dashboard = document.getElementById('dashboard-display');
    const welcome = document.getElementById('welcome-message');
    const errorBox = document.getElementById('error-message');

    loader.classList.remove('hidden-element');
    dashboard.classList.add('hidden-element');
    welcome.classList.add('hidden-element');
    errorBox.classList.add('hidden-element');

    try {
      const rawData = await fetchCountryData(chosenCountry);
      const cleanData = extractCountryData(rawData);
      displayData(cleanData);
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
