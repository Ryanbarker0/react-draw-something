import React from 'react';

const Popup = (props) => {
    return (
        <div className="popup">
            <div className="popup_window">
                <h4>Correct!</h4>
                <h5>You Really Nailed That One!</h5>
                <h5>Fancy Another?</h5>
                <div className="popup_buttons">
                    <button className="btn-main" onClick={props.closePopup}>Give Me The Next Game!</button>
                </div>
            </div>
        </div>
    )
}

export default Popup