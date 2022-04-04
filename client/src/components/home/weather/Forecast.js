import React, { useState, useEffect } from 'react';
import { Conditions } from './Conditions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../../actions/auth';

import axios from 'axios'


export const Forecast = () => {

    // get current user city
    async function getUserCity() {
        const res = await axios.get('/api/auth');
        return res.data.city;
    };

    // temporal
    let [responseObj, setResponseObj] = useState({});

    // city
    let [city, setCity] = useState('');
    // units
    let [unit, setUnit] = useState('metric');

    // error
    let [error, setError] = useState(false);

    // set city from current user
    useEffect(() => {
        getUserCity().then(data => setCity(data))
    }, [city]);

    // URI city for fetch from open-weather-map
    const uriEncodedCity = encodeURIComponent(city);

    // function with fetch
    function getForecast(e) {
        // TODO - GETFORECAST WITH FETCH
    };

    return (
        // brackets allows mix JavaScript with HTML
        <div>
            <h2>Find Current Weather Conditions Right Now</h2>
            {city}
            <Conditions
                responseObj={responseObj}
                error={error}
            />
        </div>
    );
}




