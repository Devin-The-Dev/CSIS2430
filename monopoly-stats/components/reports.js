import React from 'react';
import { arrA, arrB } from './player.js';

const ArrayDisplay = () => {
    return (
        <div>
            <h2>Strategy A</h2>
            <ul>
                {arrA.map((subArray, index) => (
                    <li key={index}>
                        {subArray.map((item, subIndex) => (
                            <span key={subIndex}>{item}</span>
                        ))}
                    </li>
                ))}
            </ul>

            <ul>
                {arrB.map((subArray, index) => (
                    <li key={index}>
                        {subArray.map((item, subIndex) => (
                            <span key={subIndex}>{item}</span>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}