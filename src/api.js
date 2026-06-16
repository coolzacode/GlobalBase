const API_KEY = process.env.COUNTRIES_API_KEY;
const BASE_URL = 'https://api.restcountries.com/countries/v5';

export async function fetchCountryData(countryName) {
  const safeQuery = encodeURIComponent(countryName); // converts "United States" to "United%20States" for API compatibility.
  try {
    const response = await fetch(`${BASE_URL}/name?q=${safeQuery}`, {
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

export function extractCountryData(apiResponse) {
  const result = apiResponse?.data?.objects?.[0];
  if (!result) return null;

  return {
    officialName: result.names.official,
    government: result.government_type,
    capital: result.capitals?.[0]?.name || 'N/A',
    population: result.population,
    borders: result.borders || [],
    currencyName: result.currencies?.[0]?.name || 'N/A',
    currencySymbol: result.currencies?.[0]?.symbol || '',
    currencyCode: result.currencies?.[0]?.code || '',
    timeZones: result.timezones || [],
  };
}
