import React, { Component } from 'react';
import API from '../API'

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleSubmit = () => {
        const { login, history } = this.props
        const user = this.state
        API.login(user)
            .then(data => {
                if (data.error) {
                    alert('Incorrect')
                } else {
                    login(data)
                    history.push('/')
                }
            })
    }

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    render() {
        const { username, password } = this.state
        const { handleChange, handleSubmit } = this

        return (
            <div>
            <input type="text" label='Username' value={username} onChange={handleChange} name='username' placeholder='Username..'/>
                <br />
            <input type='password' label='Password' value={password} onChange={handleChange} name='password' placeholder='Password..'/>
                <br />
                <button onClick={handleSubmit}>
                    Login
        </button>
            </div>
        )
    }
}

export default Login