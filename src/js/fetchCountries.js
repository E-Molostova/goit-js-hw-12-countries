const BASE_URL = 'https://restcountries.eu/rest/v2/name';
export const fetchCountries = findcountry => {
  return fetch(`${BASE_URL}/${findcountry}`)
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};
