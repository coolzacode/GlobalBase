const searchBox = document.getElementById('selected-country');
const countryList = document.getElementById('countries-list');

export function setupDropdownOptions(countriesArray) {
  const fragment = document.createDocumentFragment();

  countriesArray.forEach((country) => {
    const listElement = document.createElement('li');
    listElement.dataset.value = `${country}`;
    listElement.textContent = `${country}`;
    fragment.appendChild(listElement);
  });
  countryList.appendChild(fragment);
}

export function filterDropdownOptions() {
  if (searchBox.value === '') {
    countryList.classList.add('hidden-element');
    return;
  }

  countryList.classList.remove('hidden-element');

  const searchTerm = searchBox.value.toLowerCase();
  const options = countryList.querySelectorAll('li');

  options.forEach((option) => {
    const text = option.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      option.classList.remove('hidden-element');
    } else {
      option.classList.add('hidden-element');
    }
  });
}

export function handleDropdownSelection(event) {
  if (event.target.nodeName === 'LI') {
    const selectedCountry = event.target.textContent;
    searchBox.value = selectedCountry;
    countryList.classList.add('hidden-element');
    return selectedCountry;
  }
  return null;
}

export function displayData(cleanData) {
  document.getElementById('welcome-message').classList.add('hidden-element');
  document
    .getElementById('dashboard-display')
    .classList.remove('hidden-element');

  document.getElementById('country-name').textContent = cleanData.officialName;
  document.getElementById('government-type').textContent = cleanData.government;
  document.getElementById('capital-value').textContent = cleanData.capital;
  document.getElementById('timezone-value').textContent =
    cleanData.timeZones.join(', ');
  document.getElementById('currency-symbol').textContent =
    cleanData.currencySymbol;
  document.getElementById('currency-code').textContent = cleanData.currencyCode;
  document.getElementById('currency-name').textContent = cleanData.currencyName;

  const bordersList = document.getElementById('borders-list');
  bordersList.replaceChildren();

  if (cleanData.borders.length === 0) {
    bordersList.textContent = 'None';
  } else {
    cleanData.borders.forEach((borderCode) => {
      const span = document.createElement('span');
      span.classList.add('border-tag');
      span.textContent = borderCode;
      bordersList.appendChild(span);
    });
  }
}
