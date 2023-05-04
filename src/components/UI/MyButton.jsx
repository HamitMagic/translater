import React from 'react';

function MyButton({text, callback, logout}) {
    return (
        <button onClick={callback ? () => callback(!logout) : null}>
            {text}
        </button>
    );
}

export default MyButton;