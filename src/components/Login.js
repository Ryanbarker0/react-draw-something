import React from 'react';

const Login = props => {
    return (
        <div>
        <h2>Login</h2>
        <form>
            <input type='text' placeholder='Username..' />
            <br />
            <input type='password' placeholder='Password..' />
            <br />
            <input type='Submit' value='Login' />
        </form>
        <br />
        <button onClick={props.returnToHome} >Back To Home</button>
        </div>
    )

}

export default Login