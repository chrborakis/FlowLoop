import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const getCountries = (countries, setCountries) => {
    axios('https://restcountries.com/v3.1/all')
    .then( response => {
        const data = response.data;
        const countryNames = data.map(country => country.name.common);
        setCountries(countryNames.sort());
    })
    .catch(error => console.error('Error fetching country data:', error));
}
