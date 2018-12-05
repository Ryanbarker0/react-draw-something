import React from 'react'

class Profile extends React.Component {

    state = {
        user: undefined,
        userProfile: {
            username: '',
            first_name: '',
            last_name: ''
        },
        profileImage: ''
    }

    updateInfo = () => {
        return fetch('http://localhost:3001/api/v1/users', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.userProfile.username,
                first_name: this.state.userProfile.first_name,
                last_name: this.state.userProfile.last_name,
            })
        })
    }

    handleSubmission = event => {
        event.preventDefault()
        this.updateInfo()
        this.props.history.push('/profile')
    }

    componentDidMount = () => {
        this.setState({ user: this.props.userProfileToEdit })
    }

    componentWillUnmount = () => {
        this.props.updateProfileImage(this.state.profileImage)
    }
    
    render() {

        const { user } = this.state

        return (
            <div>
            {user &&
                <form name="update-form" onSubmit={event => this.handleSubmission(event)} >
                    <input type="text" placeholder={user.username} onChange={event => this.setState({userProfile: {...this.state.userProfile, username: event.target.value} })}/>
                        <br />
                    <input type="text" placeholder={user.first_name} onChange={event => this.setState({userProfile: {...this.state.userProfile, first_name: event.target.value} })}/>
                        <br />
                    <input type="text" placeholder={user.last_name} onChange={event => this.setState({userProfile: {...this.state.userProfile, last_name: event.target.value} })}/>
                        <br />
                    <input type="text" placeholder="Profile Image Url" onChange={event => this.setState({ profileImage: event.target.value })}/>    
                        <br />
                        <br/>
                    <input type="submit" value="Update Info" />
                </form>
            }
            </div>
        )       
    }

} // End of Class

export default Profile