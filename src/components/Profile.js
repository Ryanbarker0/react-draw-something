import React from 'react';

class Profile extends React.Component {

    state = {
        user: undefined
    }

    // Finding the relevant users info based on the userId passed in props.
    getUsers = () => {
        return fetch('http://localhost:3001/api/v1/users')
            .then(resp => resp.json())
    }

    getUser = () => {
        const foundUser = this.getUsers().then(users => users.find(user => user.id === this.props.userId))
        this.setState({ user: foundUser })
    }

    componentDidMount = () => {
        this.getUser()
    }
    // End

    editInfo = () => {
        
    }

    // Once info has been edited - use this...
    submitInfo = () => {
        return fetch('http://localhost:3001/api/v1/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                // finish this part using state.
            })
        })
    }
    
    render() {

        const { user } = this.state

        return (
            <div>
                <h1>{`${user.username}'s Profile Page`}</h1>
                <ul>
                    <li>Current Win Streak: {user.win_streak}</li>
                    <li>Name: {`${user.first_name} ${user.last_name}`}</li>
                    <li>Username: {user.username}</li>
                    <li>Password: {user.password}</li>
                </ul>
                <button onClick={this.editInfo}>Edit Information</button>
            </div>
        )
    }
}

export default Profile