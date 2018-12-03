import React, { Component } from 'react' 
import CanvasDraw from 'react-canvas-draw'
import ColorPalette from './ColorPalette'
import Select from 'react-select'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

class UserDraw extends Component {

    state = {
        word: '',
        canvas: {
            lazyRadius: 1,
            hideGrid: false,
            radius: 4,
            color: "#46403E",
            width: 400,
            height: 400
        },
        game: {
            user_id: undefined,
            game_id: undefined,
            artist: false
        },
        users: [],
        target_user_id: 2
    }

    // Functions for changing CanvasDraw tools
    changeColor = color => {
        this.setState({ canvas: {...this.state.canvas, color } })
    }

    saveCanvasToDatabase = async (word, canvas) => {
        const userGame = {word: word, 'canvas': canvas}
        await this.createGame(userGame)
            .then(game => (
                this.createUserGameForCurrentUser(game.id),
                setTimeout(this.createUserGameForTargetUser(game.id), 500)
            ))
    }
    // End

    // Word to be guessed
    getRandomWord = () => {
        const words = ['Rabbit', 'Cat', 'Dog', 'Camel', 'Tree', 'House', 'Car', 'Bicycle', 'Skiing', 'Dignity', 'Tears', 'Terminator',
    'Midwife', 'Computer', 'Glasses', 'Elephant', 'Pikachu', 'Toilet Sign', 'Stop Sign', 'Beer Bottle', 'Sushi', 'Treasure', 'Thief',
    'Lightsaber', 'Hotdog', 'Lawnmower']
        return words[Math.floor(Math.random() * words.length)]
    } // End

    // API Requests
    getUsers = () =>
        fetch('http://localhost:3001/api/v1/users')
            .then(resp => resp.json())

    createGame = async canvasObj => {
        const response = await fetch('http://localhost:3001/api/v1/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(canvasObj)
        })
        return response.json()
    }

    createUserGame = gameObj => 
    fetch('http://localhost:3001/api/v1/user_games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameObj)
    }).then(resp => resp.json())
    // End

    createUserGameForCurrentUser = async gameId => {
        const newGame = {
                user_game:{
                user_id: this.props.userId,
                game_id: gameId,
                artist: true
            }
        }
        await this.createUserGame(newGame)
    }

    createUserGameForTargetUser = gameId => {
        const newGame = {
                user_game:{
                user_id: this.state.target_user_id,
                game_id: gameId,
                artist: false
            }
        }
        this.createUserGame(newGame)
    }

    createGameInDatabase = async (word, canvas) => {
        await this.saveCanvasToDatabase(word, canvas)
        }

    componentDidMount() {
        this.getUsers()
        .then(users => this.setState({ 
        word: this.getRandomWord(),
        users: users
        }))
    }

    render() {
        return(
            <div>
                <h2>Draw: {this.state.word}</h2>
                <div className='color-palette-slider'>
                    <ColorPalette changeColor={this.changeColor} />
                    <div className='slider'>
                        <Slider min={1} max={15} defaultValue={this.state.canvas.radius} value={this.state.canvas.radius} onChange={event => this.setState( { canvas: {...this.state.canvas, radius: event } })} />
                    </div>
                </div>
                <div className='canvas-content'>
                    <CanvasDraw 
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushRadius={this.state.canvas.radius}
                        lazyRadius={this.state.canvas.lazyRadius}
                        brushColor={this.state.canvas.color}
                        canvasWidth={this.state.canvas.width}
                        canvasHeight={this.state.canvas.height}
                        hideGrid={this.state.canvas.hideGrid} 
                    />
                    <button onClick={() => this.createGameInDatabase(this.state.word, this.saveableCanvas.getSaveData())}>Save</button>
                        <br />
                    <button onClick={() => this.saveableCanvas.clear()}>Clear</button>
                        <br />
                    <button onClick={() => this.saveableCanvas.undo()}>Undo</button>
                </div>
            </div>
        )
    }

}

export default UserDraw