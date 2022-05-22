import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function BarLevel(props) {
    return props.level < 10 ? (
        <div className="progress">
            <div className="progress-bar" role="progressbar"></div>
        </div>
    ) : props.level >= 10 && props.level < 20 ? (
        <div className="progress">
            <div className="progress-bar w-25" role="progressbar"></div>
        </div>
    ) : props.level >= 20 && props.level < 25 && props.level < 30 ? (
        <div className="progress">
            <div className="progress-bar w-50" role="progressbar"></div>
        </div>
    ) : props.level >= 25 && props.level < 30 && props.level ? (
        <div className="progress">
            <div className="progress-bar w-75" role="progressbar"></div>
        </div>
    ) : (
        <div className="progress">
            <div className="progress-bar w-100" role="progressbar"></div>
        </div>
    );
}

export default BarLevel;
