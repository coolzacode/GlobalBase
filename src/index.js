import './styles.css';
import countriesData from './countries.json';
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
