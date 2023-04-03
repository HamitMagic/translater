import React from 'react';
import dictionary from '../../assets/dictinary.json';


function About({language}) {
    return (
        <div>
            {dictionary[language].about}
        </div>
    );
}

export default About;