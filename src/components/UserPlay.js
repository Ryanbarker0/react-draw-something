import React from 'react'
import CanvasDraw from 'react-canvas-draw'

class UserPlay extends React.Component {

    state = {
        currentGame: undefined,
        answer: ''
    }

    getGame = gameId => {
        return fetch(`http://localhost:3001/api/v1/games/${gameId}`)
            .then(response => response.json())
    }

    getUserGameForTargetUser = () => 
        this.state.currentGame.user_games.find(userGame => userGame.id === this.state.currentGame.artist_id)
    
    getUserGameForCurrentUser = () =>
        this.state.currentGame.user_games.find(userGame => userGame.id === this.props.userId)

    updateUserGameInDbForGuesser = currentUserGame => {
        return fetch(`http://localhost:3001/api/v1/user_games/${currentUserGame.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                user_game: {
                user_id: currentUserGame.user_id,
                game_id: currentUserGame.game_id,
                artist: true,
                lives: currentUserGame.lives
                }
            })
        })
    }

    updateUserGameInDbForArtist = artistUserGame => {
        return fetch(`http://localhost:3001/api/v1/user_games/${artistUserGame.id}`, {
            method: 'PATCH', 
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                user_game: {
                user_id: artistUserGame.user_id,
                game_id: artistUserGame.game_id,
                artist: false,
                lives: artistUserGame.lives
                }
            })
        })
    } 

    // BUILD PATCH FOR WHEN USER CORRECTLY GUESSES
    updateGameInDb = () => {
        const { currentGame } = this.state
        const gameId = currentGame.id
        return fetch(`http://localhost:3001/api/v1/games/${gameId}`, {
            method: 'PATCH',
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({
                game: {
                artist_id: this.props.userId,
                canvas: '',
                win_streak: currentGame.win_streak += 1,
                word: '',
                lives: currentGame.lives
                }
            })
        })
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
        const { getUserGameForCurrentUser, getUserGameForTargetUser, updateUserGameInDbForArtist, updateUserGameInDbForGuesser, gameWon, updateGameInDb } = this 
        const { updateIsNewGame, updateGameInState } = this.props
        event.preventDefault()

        if (this.state.answer.toLowerCase() === this.state.currentGame.word.toLowerCase()) {

            console.log('correct')
            const foundOpponent = getUserGameForTargetUser()
            const foundUser = getUserGameForCurrentUser()
            updateUserGameInDbForArtist(foundOpponent)
            updateUserGameInDbForGuesser(foundUser)
            updateIsNewGame(false)
            updateGameInState(this.state.currentGame)
            updateGameInDb()
            gameWon()

        } else {

            console.log('wrong')
            this.loseLife()
        }    
    }

    // user loses a life or game is over if they have no lives left.
    loseLife = () => {
        if (this.state.currentGame.lives >= 1) {
            const copyOfCurrentGame = {...this.state.currentGame}
            this.setState({ currentGame: {...this.state.currentGame, lives: copyOfCurrentGame.lives -= 1}})
        } else {
            this.gameOver()
        }
    }

    // Game over scenario after all lives lost.
    gameOver = () => {
        //Game Over! Better luck next time.
        this.props.history.push('/')
    }

    // Switch roles after user wins a game.
    gameWon = () => {
        //Congratulations! Now create a game for your opponent.
        this.props.history.push('/user/draw')
    }


    componentDidMount = () => {
        this.setState({currentGame: this.props.playGameObject})
    }

    render () {
        return(
            <div>
            { this.state.currentGame &&
                <h4>User Play Page - Lives: {this.state.currentGame.lives}</h4>
            }
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
        )
    }
}

export default UserPlay