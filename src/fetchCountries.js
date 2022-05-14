function fetchCountryInfo(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
    return fetch(url)
        .then(response => {
            if (response.ok) {
                 return response.json();
            } else {
                throw new Error(response.status);
            }
        });

}

export { fetchCountryInfo };