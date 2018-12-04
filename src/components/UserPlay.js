import React from 'react'
import CanvasDraw from 'react-canvas-draw'

class UserPlay extends React.Component {

    state = {
        currentGame: undefined,
        answer: ''
    }

    getGame = gameId => 
        fetch(`http://localhost:3001/api/v1/games/${gameId}`)
            .then(response => response.json())

    loadCurrentGame = () => {
        this.getGame(this.props.playGameObject.game_id)
            .then(game => this.setState({ currentGame: game }))
    }

    componentDidMount = () => {
        this.loadCurrentGame()
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
        if (this.state.currentGame.lives >= 1) {
            const copyOfCurrentGame = {...this.state.currentGame}
            this.setState({...copyOfCurrentGame, lives: copyOfCurrentGame.lives -= 1})
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

    render () {
        return(
            <div>
                User Play Page
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