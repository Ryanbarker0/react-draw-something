import React, { Component } from 'react'

class MyGames extends Component {

    state = {
        games: []
    }

    getGames = () => {
        return fetch('http://localhost:3001/api/v1/games')
            .then(response => response.json())
    }

    filterForPlayableGames = () => {
        const filteredGames = this.state.games.filter(game => game.artist_id !== this.props.userId)
        return filteredGames.filter(game => game.users.find(user => user.id === this.props.userId))
    }

    filterForOpponents = () => 
        this.filterForPlayableGames().flatMap(game => game.users.filter(user => user.id !== this.props.userId ))
    


    findGameInState = id => 
        this.state.games.find(game => game.users.find(user => user.id === parseInt(id)))
    
    playSelectedGame = id => {
        const foundGame = this.findGameInState(id)
        this.props.updatePlayGameObject(foundGame)
        this.props.navigateUserPlay()
    }

    componentDidMount() {
        this.getGames()
        .then(games => this.setState({ games: games}))
    }

    render () {
        const { filterForPlayableGames } = this
        return(
            <div className='user-games-container' >
                <div>
                { filterForPlayableGames().length > 0 ?
                
                    this.filterForOpponents().map((user) => <p id={user.id} onClick={event => this.playSelectedGame(event.target.id)}>Game with: {user.username.toUpperCase()}</p> )
                    :
                    <p>You Don't Currently Have Any Active Games</p>
                }
                </div>
            </div>
        )    
    }
}

export default MyGames