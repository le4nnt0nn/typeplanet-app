import React, { useState, useEffect } from 'react';
import useForceUpdate from 'use-force-update';
import { Conditions } from './Conditions';
import useSound from 'use-sound';

import axios from 'axios';

// sounds
import refreshSound from '../../../sounds/refreshWeather.mp3';

export const Forecast = () => {

    // play refresh button sound
    const [play] = useSound(refreshSound);

    // call useForceUpdate to refresh component
    const forceUpdate = useForceUpdate();

    // get current user city
    async function getUserCity() {
        const res = await axios.get('/api/auth');
        return res.data.city;
    };

    // response Object from weather fetch
    let [responseObj, setResponseObj] = useState({});

    // city
    let [city, setCity] = useState('');

    // units
    let [unit, setUnit] = useState('metric');

    // error
    let [error, setError] = useState(false);

    /**
     * 
     * @desc function to fetch weather data 
     */

    function getForecast() {

        // play refresh button sound
        play()

        // refresh component when function is called
        forceUpdate()

        // city.length is 0, return error
        if (city.length === 0) {
            return setError(true);
        }

        // initial values
        setError(false);
        setResponseObj({});

        // fetch uri
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "5d42d2897emsh6345ce50d7b7adcp1ca28cjsnee0a752867ba",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.cod !== 200) {
                throw new Error()
            }
            setResponseObj(response);
            console.log(response)
            return setResponseObj(response);
        })
        .catch(err => {
            setError(true);
            console.error(err.message);
            return err.message
        });
    };


    // set city from current user
    useEffect(() => {
        getUserCity().then(data => setCity(data))
    }, [city]);
    // pass weather data to Conditions component every time
    useEffect(() => {
        getForecast();
    }, [Conditions]);

    
    // URI city for fetch from open-weather-map
    const uriEncodedCity = encodeURIComponent(city);

    return (
        // brackets allows mix JavaScript with HTML
        <div className="p-5">
            <Conditions
                responseObj={responseObj}
                error={error}
            />
            <button onClick={getForecast}>Refresh</button>
        </div>
    );
}




