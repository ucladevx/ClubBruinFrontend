import React from 'react';

function Title(props) {
    console.log(props)

    
    return (
        <div className="title">
            <button className="back-button-placeholder">&gt;</button>
            <div className="title-text">{props.title}</div>
        </div>
    );
}

export default Title;
