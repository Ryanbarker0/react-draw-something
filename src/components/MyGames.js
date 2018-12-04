import React from 'react'

class MyGames extends React.Component {

    state = {
        userGames: []
    }

    // Fetches all the games.
    getGames = () => {
        return fetch('http://localhost:3001/api/v1/user_games')
            .then(response => response.json())
    }

    // Filters the games by the id of the current user to display on users 'My Games' page.
    getUserGames = (games, id) => {
        const filteredGames = games.filter(game => (game.user_id === id) && (!game.artist))
        this.setState({ userGames: filteredGames })
    }

    // Selects the game for the user to play.
    playSelectedGame = event => {
        const foundGame = this.state.userGames.find(game => game.id === parseInt(event.target.id))
        this.props.updatePlayGameObject(foundGame)
        this.props.navigateUserPlay()
    }

    componentDidMount() {
        this.getGames()
        .then(games => this.getUserGames(games, this.props.userId))
    }


    render () {
        return(
            <div className='user-games-container' >
                My Games Page
                <ul>
                {this.state.userGames.map((game) => <li id={game.id} onClick={event => this.playSelectedGame(event)}> {game.lives} </li>)}
                </ul>
            </div>
        )    
    }
}

export default MyGames