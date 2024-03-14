import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const getCountries = (countries, setCountries) => {
    axios('https://countriesnow.space/api/v0.1/countries')
    .then( response => {
        // const countryNames = data.map(country => country.name.common);
        if (!response.error) {
            setCountries(response.data.data.sort());
        }else throw new Error('Error fetching data from the server');
    })
    .catch(error => console.log(error));
}
