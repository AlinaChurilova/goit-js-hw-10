import './css/styles.css';
import Notiflix from 'notiflix';
import oneCountryTpl from './one-country.hbs';
import countryList from './list-countries.hbs';
import { fetchCountryInfo } from './fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


const refs = {
    entryField: document.querySelector('#search-box'),
    listCountries: document.querySelector('.country-list'),
    countryFullInfo: document.querySelector('.country-info')
}

refs.entryField.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY));


function onInputHandler(e) {

    const searchQuery = e.target.value;
    if (searchQuery) {
        fetchCountryInfo(searchQuery.trim()).then(renderCountryCard)
            .catch(onFetchError);
    } else {
        refs.countryFullInfo.innerHTML = "";  
    }
}


function renderCountryCard(country) {
    if (country.length === 1) {
        const markup = oneCountryTpl(country);
        refs.countryFullInfo.innerHTML = markup; 
    }
    if (country.length >= 2 && country.length <= 10) {
        const layout = countryList(country);
        refs.countryFullInfo.innerHTML = layout; 
    }
    if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
}

 function onFetchError(error) {
     Notiflix.Notify.failure('Oops, there is no country with that name');
    }