import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function Card({ img, title, txt, url }) {
    return (
        <div className="card text-center bg-dark mt-4">
            <div className="overflow">
                <img src={img} alt="info-img" className="card-img"></img>
            </div>
            <div className="card-body text-light">
                <h4 className="card-title">{title}</h4>
                <p className="card-text text-info">
                    {txt ? txt : 'other info here...'}
                </p>
                <a
                    href={url ? url : "#!"}
                    target="_blank"
                    className="btn btn-outline-secondary border-0"
                    rel="noreferrer"
                >
                    See more {title}
                </a>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    txt: PropTypes.string,
    url: PropTypes.string,
    img: PropTypes.string
};

export default Card;