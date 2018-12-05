import React from 'react';

const Popup = (props) => {
    return (
        <div className="popup">
            <div className="popup_window">
                <h4>Saved</h4>
                <div className="popup_buttons">
                    <button className="btn-main" onClick={props.closePopup}>Close</button>
                </div>
            </div>
        </div>
        )
}

export default Popup