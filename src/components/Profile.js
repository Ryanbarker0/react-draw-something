import React from 'react';

class Profile extends React.Component {

    state = {
        user: undefined,
        image: this.props.defaultProfileImage
    }

    // Finding the relevant users info based on the userId passed in props.
    getUsers = () => {
        return fetch('http://localhost:3001/api/v1/users')
            .then(resp => resp.json())
    }

    componentDidMount = () => {
        this.getUsers()
            .then(users => {
                const foundUser = users.find(user => user.id === this.props.userId)
                this.setState({ user: foundUser })  
            })
    }
    // End

    editInfo = () => {
        this.props.updateUserProfileToEdit(this.state.user)
        this.props.navigateEditProfile()
    }
    
    render() {

        const { user, image } = this.state

        return (
            <div className='profile-page'>
            { user &&
                <div>
                    <h1>{`${user.username}'s Profile Page`}</h1>
                    <ul>
                        <li><img src={image} alt='profile pic' width='50%'/></li>
                        <li><strong>Name: </strong>{`${user.first_name} ${user.last_name}`}</li>
                        <li><strong>Username: </strong>{user.username}</li>
                    </ul>
                    <button onClick={this.editInfo}>Edit Information</button>
                </div>
            }
            </div>
        )
    }
}

export default Profile