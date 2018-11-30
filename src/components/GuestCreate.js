import React from 'react'
import CanvasDraw from 'react-canvas-draw'
import API from '../API'

export default class GuestCreate extends React.Component {

    state = {
        word: ''
    }

    getRandomWord = () => {
        const words = ['Rabbit', 'Cat', 'Dog', 'Camel', 'Tree', 'House', 'Car', 'Bicycle', 'Skiing', 'Dignity', 'Tears', 'Terminator',
    'Midwife', 'Computer', 'Glasses', 'Elephant', 'Pikachu', 'Toilet Sign', 'Stop Sign', 'Beer Bottle', 'Sushi', 'Treasure', 'Thief',
    'Lightsaber', 'Hotdog', 'Lawnmower']
        return words[Math.floor(Math.random() * words.length)]
    }

    createGuestGame = gameObj => 
    fetch('http://localhost:3001/api/v1/guest_games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameObj)
    }).then(resp => resp.json())

    saveCanvasToDatabase = (word, canvas) => {
        const guestGame = {name: word, 'canvas': canvas}
        this.createGuestGame(guestGame)
            .then(item => console.log(item))
    }

    componentDidMount() {
        this.setState({ word: this.getRandomWord() })
    }

    render() {
        return(
            <div>
                <h2>Draw: {this.state.word}</h2>
                <CanvasDraw 
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                />
                <button onClick={() => this.saveCanvasToDatabase(this.state.word, this.saveableCanvas.getSaveData())}>Save</button>
            </div>
        )
    }
}