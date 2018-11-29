import React from 'react';

const Login = props => {
    return (
        <div>
        <p>THIS IS THE LOGIN PAGE</p>
        <br/>
        <button onClick={props.returnToHome} >TAKE ME BACK TO WHERE WE FIRST MET</button>
        </div>
    )

}

export default Login