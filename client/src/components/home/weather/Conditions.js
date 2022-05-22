import React from 'react';
import './style.css';

export const Conditions = (props) => {
    return (
        <div>
            {props.responseObj.cod === 200 ?
                <div>
                    <h2><strong>{props.responseObj.name}</strong></h2>
                    <div className="temp-wrapper">
                        <h2 className="temp">{Math.round(props.responseObj.main.temp)}º</h2>
                    </div>
                    <img src={`http://openweathermap.org/img/wn/${props.responseObj.weather[0].icon}@2x.png`}></img>
                </div>
                : null
            }
        </div>
    )
}

// description
// <h2>{props.responseObj.weather[0].description.toUpperCase()}</h2>