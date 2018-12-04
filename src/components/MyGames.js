import React from 'react'

class MyGames extends React.Component {

    state = {
        userGames: [],
        opponents: []
    }

    // Fetches all the games.
    getGames = () => {
        return fetch('http://localhost:3001/api/v1/user_games')
            .then(response => response.json())
    }

    getSpecificUser = id => {
        return fetch(`http://localhost:3001/api/v1/users/${id}`)
        .then(resp => resp.json())
    }

    getOpponents = () => {
        this.state.opponentGames.forEach(game => {
            this.getSpecificGame(game.user_id)
            .then()
        })
    }

    getUserGames = (games, id) => {
        const filteredGames = games.filter(game => (game.user_id === id) && (!game.artist))
        this.setState({ userGames: filteredGames })
    }

    // Filters the games by the id of the current user to display on users 'My Games' page.
    getUserAndOpponentGames = (games, id) => {
        const userGames = games.filter(game => (game.user_id === id) && (!game.artist))
        const opponentGames = games.filter(game => (game.user_id === id) && (game.artist))
        opponentGames.map(game => {
            this.getSpecificUser(game.user_id)
            .then(user => this.setState({ userGames: userGames, opponents: [...this.state.opponents, user] })) 
    })
}

    // Selects the game for the user to play.
    playSelectedGame = event => {
        const foundGame = this.state.userGames.find(game => game.id === parseInt(event.target.id))
        this.props.updatePlayGameObject(foundGame)
        this.props.navigateUserPlay()
    }

    filterGames = games => 
        games.filter(game => (game.user_id === this.props.userId) && (!game.artist))

    getGameIds = filteredGames => 
        filteredGames.map(game => game.game_id)

    getAllGames = (games, gameIds) =>
        gameIds.map(id => games.filter(game => game.game_id === id))

    getOpponentGames = allGames => 
        allGames.flatMap(games => games.filter(game => game.artist))
   

    componentDidMount() {
        const { getSpecificUser } = this
        const { userId } = this.props
        this.getGames()
            .then(games => {
                const filteredGames = this.filterGames(games)
                const gameIds = this.getGameIds(filteredGames)
                const allGames = this.getAllGames(games, gameIds)
                const opponentGames = this.getOpponentGames(allGames)
                const array = []
                const oppObj = []
                opponentGames.forEach(game => {
                    getSpecificUser(game.user_id).then(user => array.push(user))
                    setTimeout(array.forEach(user => oppObj.push(
                        {
                        user: user.username,
                        game_obj: allGames.find(game => game.user_id === user.id)
                        }
                    ), 5000)
                    )}
                )
                this.setState({ userGames: filteredGames, opponents: array, opponentGames: oppObj })
            }
        )
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