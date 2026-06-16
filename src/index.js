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
countryList.addEventListener('click', handleDropdownSelection);

const result = await fetchCountryData('Canada');
console.log(extractCountryData(result));
