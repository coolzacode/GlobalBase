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
  console.log(cleanData);
  console.log(cleanData.officialName);
  // const dashboard = document.getElementById('dashboard-display');
  // dashboard.replaceChildren();
  // const fragment = document.createDocumentFragment();

  // const headerDiv = document.createElement('div');
  // const disName = document.createElement('h1');
  // const disGovernment = document.createElement('p');
  // headerDiv.append(disName, disGovernment);

  // disName.textContent = cleanData.officialName;
  // disGovernment.textContent = cleanData.government;
}
