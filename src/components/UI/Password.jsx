import React from 'react';

function Password({callback, text, id}) {
    return (
        <img id={id} src='../../../assets/images/eye.svg' alt={text} onClick={(e) => callback(e.target.previousElementSibling)} />
    );
}

export default Password;