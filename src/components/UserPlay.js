import React from 'react'
import CanvasDraw from 'react-canvas-draw'

class UserPlay extends React.Component {

    state = {
        allGames: [],
        userGames: [],
        // currentGame will need to be passed an object of a game
        currentGame: undefined,
        answer: ''
    }

    // Fetches all the games.
    getGames = () => {
        return fetch('http://localhost:3001/api/v1/user_games')
            .then(response => response.json())
    }

    // Filters the games by the id of the current user to display on users 'My Games' page.
    getUserGames = id => {
        const games = this.state.allGames.filter(user => user.id === id)
        const gamesWhereUserIsNotArtist = games.filter(game => game.artist === false)
        this.setState({ userGames: gamesWhereUserIsNotArtist })
    }

    // Selects the game for the user to play.
    // !!!! Need to link an onClick event somewhere !!!!
    playSelectedGame = id => {
        this.state.userGames.find(game => game.id === id)
    }

    currentGameObjects = game => {
        return {
            word: game.name,
            'canvas': game.canvas
        }
    }

    // adds users answer to state.
    handleChange = event => {
        this.setState({ answer: event.target.value })
    }

    // Checks the game for a correct answer. Lose a life if wrong, create a game if right.
    checkForCorrectAnswer = event => {
        event.preventDefault()
        if (this.state.answer.toLowerCase() === this.state.currentGame.name.toLowerCase()) {
            console.log('correct')
            this.gameWon()
        } else {
            console.log('wrong')
            this.loseLife()
        }    
    }

    // user loses a life or game is over if they have no lives left.
    loseLife = () => {
        if (this.state.currentGame.lives => 1) {
            this.state.currentGame.lives - 1
        } else {
            this.gameOver()
        }
    }

    // Game over scenario after all lives lost.
    gameOver = () => {
        //Game Over! Better luck next time.
        this.props.history.push('/user/play')
    }

    // Switch roles after user wins a game.
    gameWon = () => {
        //Congratulations! Now create a game for your opponent.
        this.props.history.push('/user/draw')
    }

    componentDidMount() {
        this.getUserGames(this.props.userId)
    }


    render () {

        const { currentGame, userGames } = this.state

        return(
            <div className="user-play-container">
                { currentGame === undefined ?
                    <div className='user-games-container'>
                        {/* NOT SURE IF THIS IS THE BEST METHOD?? Aim is to get list and add onClick to then add game id to this.state.currentGame */}
                        {userGames.map( game => <GameCard game={game} />)}
                    </div>
                    :
                    <div>
                        <CanvasDraw disabled ref={canvasDraw => (this.loadableCanvas = canvasDraw)} />
                        <button onClick={() => {this.loadableCanvas.loadSaveData(this.state.currentGame['canvas'])}}>Start Game
                        </button>
                            <br />
                        <form onSubmit={this.checkForCorrectAnswer}>
                            <input placeholder='Type your answer here...' value={this.state.answer} onChange={event => this.handleChange(event)}></input>
                                <br />
                            <input type='submit' value='Submit Guess'></input>
                        </form>
                    </div>
                }
            </div>
        )    
    }
}

export default UserPlay