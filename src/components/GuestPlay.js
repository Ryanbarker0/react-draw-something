import React from 'react'
import CanvasDraw from 'react-canvas-draw'

export default class GuestPlay extends React.Component {

    state = {
        games: [],
        currentGame: undefined,
        answer: ''
    }

    getGuestGame = () => 
    fetch('http://localhost:3001/api/v1/guest_games')
        .then(resp => resp.json())

    getRandomGame = games => 
        games[Math.floor(Math.random() * games.length)]

    getGameObjects = game => {
        return {
            word: game.name,
            'canvas': game.canvas
        }
    }

    handleChange = event => {
        this.setState({ answer: event.target.value })
    }

    checkForCorrectAnswer = event => {
        event.preventDefault()
        if (this.state.answer.toLowerCase() === this.state.currentGame.name.toLowerCase()) {
            console.log('correct')
        } else {
            console.log('wrong')
        }    
    }

    componentDidMount() {
        this.getGuestGame()
            .then(games => this.setState({ currentGame: this.getRandomGame(games),
                games: [...this.state.games, (
                 games.map(game => 
                    this.getGameObjects(game)
                    ))]
                })
            )
    }

    render() {
        return(
            <div>
                <CanvasDraw disabled ref={canvasDraw => (this.loadableCanvas = canvasDraw)} />
                <button onClick={() => {this.loadableCanvas.loadSaveData(this.state.currentGame['canvas'])}}>Start Game</button>
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