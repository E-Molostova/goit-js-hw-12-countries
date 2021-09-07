import refs from './refs';
import { fetchCountries } from './fetchCountries';

import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
defaults.delay = '2000';
import '@pnotify/core/dist/BrightTheme.css';

import makeCountryMarkup from '../templates/country.hbs';
import makeCountriesList from '../templates/countriesList.hbs';

const debounce = require('lodash.debounce');

const onInputClick = () => {
  const findcountry = refs.input.value;

  fetchCountries(findcountry)
    .then(data => {
      console.log(data);
      const dataLength = data.length;
      if (dataLength === 1) {
        const markup = makeCountryMarkup(data[0]);
        return renderCountries(markup);
      }
      if (dataLength > 1 && dataLength < 10) {
        const markup = makeCountriesList(data);
        return renderCountries(markup);
      }
      if (dataLength > 10) {
        renderCountries();
        handleErr('Too many matches found. Please enter a more specific query!');
        return;
      }
      if (data.status >= 400) {
        renderCountries();
        handleErr('No such country!');
        return;
      }
    })
    .catch(err => console.log(err));
};

function renderCountries(markup = '') {
  refs.list.innerHTML = markup;
}
function handleErr(text) {
  error({ text });
}

refs.input.addEventListener('input', debounce(onInputClick, 500));
