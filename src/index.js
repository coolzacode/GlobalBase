import './styles.css';
import countriesData from './countries.json';
import { fetchCountryData, extractCountryData } from './api.js';
import {
  setupDropdownOptions,
  filterDropdownOptions,
  handleDropdownSelection,
} from './ui.js';

const searchBox = document.getElementById('selected-country');
const countryList = document.getElementById('countries-list');

setupDropdownOptions(countriesData);

searchBox.addEventListener('input', filterDropdownOptions);
countryList.addEventListener('click', async (event) => {
  const chosenCountry = handleDropdownSelection(event);

  if (chosenCountry) {
    try {
      console.log(`Querying API: ${chosenCountry}`);
      const rawData = await fetchCountryData(chosenCountry);
      const cleanData = extractCountryData(rawData);
      console.log('Ready for rendering:', cleanData);
    } catch (error) {
      console.error('Failed execution cycle:', error.message);
    }
  }
});
