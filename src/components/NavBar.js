import React from 'react'    

const NavBar = props => {

    return (
        <div>
            <button className='NavBar-Login' onClick={props.navigateLogin}>
                Login
            </button>
            <button className='NavBar-Logout' onClick={props.navigateSignup}>
                Signup
            </button>
            <button className='NavBar-Logout'>
                Logout
            </button>
        </div>
    )
}

export default NavBar