import React from 'react'
import CanvasDraw from 'react-canvas-draw'
import ColorPalette from './ColorPalette'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


export default class GuestCreate extends React.Component {

    state = {
        lazyRadius: 1,
        hideGrid: false,
        radius: 4,
        color: "#46403E",
        width: 400,
        height: 400,
        word: ''
    }

    changeColor = color => {
        this.setState({ color })
    }

    getRandomWord = () => {
        const words = this.props.words
        return words[Math.floor(Math.random() * words.length)]
    }

    capitalizeFirstLetter = (string) => 
        string.charAt(0).toUpperCase() + string.slice(1);


    createGuestGame = gameObj => 
    fetch('http://localhost:3001/api/v1/guest_games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameObj)
    }).then(resp => resp.json())

    saveCanvasToDatabase = (word, canvas) => {
        const guestGame = {name: word, 'canvas': canvas}
        this.createGuestGame(guestGame)
        window.location.reload()
    }

    componentDidMount() {
        this.setState({ word: this.getRandomWord() })
    }

    render() {
        const { capitalizeFirstLetter } = this
        return(
            <div className='create-container'>

                <div className='buttons-container'>
                    <button onClick={() => this.saveCanvasToDatabase(this.state.word, this.saveableCanvas.getSaveData())}>Save</button>
                    <button onClick={() => this.saveableCanvas.clear()}>Clear</button>
                    <button onClick={() => this.saveableCanvas.undo()}>Undo</button>
                </div>

                <div className='canvas-container'>

                    <h2>Draw: {capitalizeFirstLetter(this.state.word)}</h2>

                    <div className='canvas'>
                        <CanvasDraw 
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            brushRadius={this.state.radius}
                            lazyRadius={this.state.lazyRadius}
                            brushColor={this.state.color}
                            canvasWidth={this.state.width}
                            canvasHeight={this.state.height}
                            hideGrid={this.state.hideGrid} 
                        />
                    </div>

                    <div className='slider-container'>
                        <Slider 
                            min={1} max={15} 
                            defaultValue={this.state.radius} 
                            value={this.state.radius} 
                            trackStyle={{ backgroundColor: '#3F51B5'}}
                            handleStyle={{border: 'solid 2px #3F51B5'}}
                            onChange={event => this.setState({ radius: event })} />
                        <h5>Brush Size</h5>
                    </div>

                </div>

                <div className='palette-container'>
                    <ColorPalette changeColor={this.changeColor} />
                </div>

            </div>
        )
    }
}