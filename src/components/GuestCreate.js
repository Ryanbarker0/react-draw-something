import React from 'react'
import CanvasDraw from 'react-canvas-draw'
import ColorPalette from './ColorPalette'
import Popup from './Popup'

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
        word: '',
        popup: false
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
        this.setState({popup: true})
    }

    componentDidMount() {
        this.setState({ word: this.getRandomWord() })
    }

    closePopup = () => {
        this.setState({popup: false})
    }

    render() {
        const { capitalizeFirstLetter } = this
        return(
            <div className='create-container'>
                {
                    this.state.popup && <Popup closePopup={this.closePopup}/>
                }
                <div className='buttons-container'>
                    <button className="btn-main" onClick={() => this.saveCanvasToDatabase(this.state.word, this.saveableCanvas.getSaveData())}>Submit Creation</button>
                    <button className="btn-main" onClick={() => this.saveableCanvas.clear()}>Clear</button>
                    <button className="btn-main" onClick={() => this.saveableCanvas.undo()}>Undo</button>
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
                    <h5>Brush Size</h5>
                        <Slider 
                            min={1} max={15} 
                            defaultValue={this.state.radius} 
                            value={this.state.radius} 
                            trackStyle={{ backgroundColor: 'rgb(83, 217, 232)'}}
                            handleStyle={{ border: 'solid 2px rgb(83, 217, 232)', backgroundColor: 'rgb(83, 217, 232)'}}
                            onChange={event => this.setState({ radius: event })} />
                    </div>

                </div>

                <div className='palette-container'>
                    <ColorPalette changeColor={this.changeColor} />
                </div>

            </div>
        )
    }
}