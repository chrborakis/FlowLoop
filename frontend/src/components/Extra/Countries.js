import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const getCountries = (countries, setCountries) => {
    axios('https://restcountries.com/v3.1/all')
    .then( response => {
        const data = response.data;
        const countryNames = data.map(country => country.name.common);
        if (!response.ok) {
            throw new Error('Error fetching data from the server');
        }else setCountries(countryNames.sort());
    })
    .catch(error => console.log(error));
}
