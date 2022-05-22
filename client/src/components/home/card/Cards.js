import React from 'react';
import Card from './Card';

import {
    generalInfo,
    reactInfo,
    angularInfo,
    jsInfo,
    javaInfo,
    cInfo
}
    from './info/data';

// concat all info into array
const allInfo =
    generalInfo.
        concat(reactInfo).
        concat(angularInfo).
        concat(jsInfo).
        concat(javaInfo).
        concat(cInfo)

// shuffle for mix info
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // while there remain elements to shuffle
    while (currentIndex != 0) {

        // pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // and swap it with the current element
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
shuffle(allInfo)
// concat 3 random elements into array from allInfo
const postingInfo = [allInfo[0]].concat(allInfo[1]).concat(allInfo[2])
const cards = postingInfo

function Cards() {
    return (
        <div className="container d-flex justify-content-center align-items-center h-100">
            <div className="row">
                {cards.map(({ title, image, url, id, txt }) => (
                    <div className="col-md-4" key={id}>
                        <Card img={image} title={title} url={url} txt={txt} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;