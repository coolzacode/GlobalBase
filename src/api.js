const API_KEY = process.env.COUNTRIES_API_KEY;
const BASE_URL = 'https://api.restcountries.com/countries/v5';

export async function fetchCountryData(countryName) {
  try {
    const response = await fetch(`${BASE_URL}/name?q=${countryName}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    if (!response.ok) {
      throw new Error(`Country not found (${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error.message);
    throw error;
  }
}

export function extractCountryData(country) {
  const result = country.data.objects[0];
  const officialName = result.names.official;
  const government = result.government_type;
  const capital = result.capitals[0].name;
  const population = result.population;
  const borders = result.borders;
  const currencyName = result.currencies[0].name;
  const currencySymbol = result.currencies[0].symbol;
  const currencyCode = result.currencies[0].code;
  const timeZones = result.timezones;

  return {
    officialName: officialName,
    government: government,
    capital: capital,
    population: population,
    borders: borders,
    currencyName: currencyName,
    currencySymbol: currencySymbol,
    currencyCode: currencyCode,
    timeZones: timeZones,
  };
}
