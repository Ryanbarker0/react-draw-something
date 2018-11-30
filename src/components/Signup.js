import React from 'react';

const Signup = props => {
    return (
        <div>
        <p>THIS IS THE SIGNUP PAGE</p>
        <br/>
        <button onClick={props.returnToHome} >TAKE ME BACK TO WHERE WE FIRST MET</button>
        </div>
    )

}

export default Signup