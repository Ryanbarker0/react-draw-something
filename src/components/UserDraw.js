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
        target_user_id: undefined,
        words: this.props.words
    }

    // Functions for changing CanvasDraw tools
    changeColor = color => {
        this.setState({ canvas: {...this.state.canvas, color } })
    }

    saveCanvasToDatabase = async (word, canvas) => {
        const { target_user_id } = this.state
        const { userId } = this.props
        if (!target_user_id) {
            alert("Please Select A User To Play Against")
        } else {
            const userGame = { word: word, 'canvas': canvas, artist_id: userId }
        await this.createGame(userGame)
            .then(game => (
                this.createUserGameForCurrentUser(game.id),
                setTimeout(this.createUserGameForTargetUser(game.id), 5000)
            ))
        }
    }
    // End

    // Word to be guessed
    getRandomWord = () => {
        const words = this.props.words
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

    updateGameInDb = (word, canvas) => {
        const { game } = this.props
        return fetch(`http://localhost:3001/api/v1/games/${game.id}`, {
            method: 'PATCH',
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify({
                game: {
                    artist_id: game.artist_id,
                    word: word,
                    canvas: canvas,
                    win_streak: game.win_streak,
                    lives: game.lives,
                }
            })
        })
    }
// below 2 functions are a work in progress
    // still need to create successful patch on drawing submission
    // ensure the correct parties are getting true/false swap for artist
    updateUserGameForTargetUser = gameObj => {
        return fetch(`http://localhost:3001/api/v1/user_games/${gameObj.id}`, {
            method: 'PATCH',
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify({
                user_game: {
                    user_id: gameObj.user_id,
                    game_id: this.props.game.id,
                    artist: true,
                    lives: gameObj.lives
                }
            })
        })
    }

    updateUserGameForCurrentUser = gameObj => {
        return fetch(`http://localhost:3001/api/v1/user_games/${gameObj.id}`, {
            method: 'PATCH',
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify({
                user_game: {
                    user_id: gameObj.user_id,
                    game_id: this.props.game.id,
                    artist: false,
                    lives: gameObj.lives
                }
            })
        })
    }

    updateGameInDatabase = (word, canvas) => {
        this.updateGameInDb(word, canvas)
        this.updateUserGameForTargetUser(this.findTargetUserInGame())
        this.updateUserGameForCurrentUser(this.findCurrentUserInGame())
    }

    findCurrentUserInGame = () => 
        this.props.game.users.find(user => user.id === this.props.game.artist_id)
    
    findTargetUserInGame = () =>
        this.props.game.users.find(user => user.id !== this.props.game.artist_id)


    getDropDownOptions = () => {
        const options = []
        this.state.users.map(user => options.push({
            id: user.id,
            value: user.username,
            label: user.username
        }))
        return options
    }

    capitalizeFirstLetter = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1);

    componentDidMount() {
        this.getUsers()
        .then(async users => await this.setState({ 
        word: this.getRandomWord(),
        users: users
        }))
    }

    handleSelection = event => {
        this.setState({
            target_user_id: event.id
        })
    }

    render() {
        const { isNewGame, game } = this.props
        const { capitalizeFirstLetter } = this
        return(
            <div className='create-container'>
            <div className='buttons-container'>
                { isNewGame ?
                    <button onClick={() => this.createGameInDatabase(this.state.word, this.saveableCanvas.getSaveData())}>Save</button>
                    :
                    <button onClick={() => this.updateGameInDatabase(this.state.word, this.saveableCanvas.getSaveData())}>Save</button>
                    }
                    <button onClick={() => this.saveableCanvas.clear()}>Clear</button>
                    <button onClick={() => this.saveableCanvas.undo()}>Undo</button>
            </div>

            <div className='canvas-container'>

                <h2>Draw: {capitalizeFirstLetter(this.state.word)}</h2>
                <div className='canvas'>
                    <CanvasDraw 
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushRadius={this.state.canvas.radius}
                        lazyRadius={this.state.canvas.lazyRadius}
                        brushColor={this.state.canvas.color}
                        canvasWidth={this.state.canvas.width}
                        canvasHeight={this.state.canvas.height}
                        hideGrid={this.state.canvas.hideGrid} 
                    />
                </div>
            </div>

            <div className='slider-container'>
                <Slider 
                    min={1} max={15} 
                    defaultValue={this.state.canvas.radius} 
                    value={this.state.canvas.radius} 
                    trackStyle={{ backgroundColor: '#3F51B5' }}
                    handleStyle={{ border: 'solid 2px #3F51B5' }}
                    onChange={event => this.setState({ canvas: { ...this.state.canvas, radius: event } })} 
                />
            </div>

            <div className='palette-container'>
                <ColorPalette changeColor={this.changeColor} />
            </div> 
                { isNewGame &&
                <div className='dropdown'>
                <h5>Choose Another User To Challenge</h5>
                <Select options={this.getDropDownOptions()} onChange={event => this.handleSelection(event)}/>
                </div>
                }
            </div>
        )
    }

}

export default UserDraw