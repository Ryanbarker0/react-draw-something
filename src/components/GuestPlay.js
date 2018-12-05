import React from 'react'
import CanvasDraw from 'react-canvas-draw'
import CorrectPopup from './Popup'

export default class GuestPlay extends React.Component {

    state = {
        games: [],
        currentGame: undefined,
        answer: '',
        popup: false
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
            this.setState({popup: true, answer: true})
        } else {
            alert('Incorrect! Try Again!')
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
            <div className='create-container'>

            { this.state.popup &&
                <CorrectPopup />
            }

                <div className='buttons-container'>
                    <button className='btn-main' onClick={() => { this.loadableCanvas.loadSaveData(this.state.currentGame['canvas']) }}>Start Game</button>

                </div>
                <div className='canvas-container'>
                    <CanvasDraw disabled ref={canvasDraw => (this.loadableCanvas = canvasDraw)} />
                    <div className='form-container'>
                        <form onSubmit={this.checkForCorrectAnswer}>
                            <input className='guess' placeholder='Type your answer here...' value={this.state.answer} onChange={event => this.handleChange(event)}></input>
                            <div className='form-submit'>
                            <input className='btn-main' type='submit' value='Submit Guess'></input>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}