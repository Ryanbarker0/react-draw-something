import React, { Component } from 'react';

class Signup extends Component {

    state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            password_confirmation: ''
    }

    createUser = newUser => 
        fetch('http://localhost:3001/api/v1/users', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                user: newUser
            })
        }).then(resp => resp.json())

    passwordCheckAndCreateUser = event => {
        event.preventDefault()
        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }
        this.createUser(newUser)
    }
    
    
    render () {

        return (
         <div>
         <h2>Sign Up</h2>
                <form onSubmit={event => this.passwordCheckAndCreateUser(event)}>
            <input type='text' placeholder='First Name' onChange={event => this.setState(
                { 
                    first_name: event.target.value 
                }
                )}/>
                    <input type='text' placeholder='Last Name' onChange={event => this.setState(
                        {
                                last_name: event.target.value
                            }
                    )}/>
                    <input type='text' placeholder='Username' onChange={event => this.setState(
                        {
                                username: event.target.value
                            }
                    )}/>
                    <input type='password' placeholder='Password' onChange={event => this.setState(
                        {
                                password: event.target.value
                            }
                    )}/>
                    <input type='password' placeholder='Confirm Password' onChange={event => this.setState(
                        {
                                password_confirmation: event.target.value
                            }
                    )}/>
                    <input type='submit' value='Sign Up' />
         </form>
         </div>
        )
    }

}

export default Signup