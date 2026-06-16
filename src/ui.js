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
  if (countryList.classList.contains('hidden-element')) {
    countryList.classList.remove('hidden-element');
  }
  if (searchBox.value === '') {
    countryList.classList.add('hidden-element');
  }

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
    searchBox.value = event.target.textContent;

    const options = countryList.querySelectorAll('li');
    for (const opt of options) {
      opt.classList.add('hidden-element');
    }
    countryList.classList.add('hidden-element');
  }
}
