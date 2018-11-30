import React, { Component } from 'react';
import CanvasDraw from "react-canvas-draw";

class Home extends Component {

    state = {
        lazyRadius: 1,
        hideGrid: false,
        radius: 4,
        color: "#0000FF",
        width: 400,
        height: 400,
        "savedCanvas": undefined
    }

    getRandomWord = () => {
        const words = ['Rabbit', 'Cat', 'Dog', 'Camel', 'Tree', 'House', 'Car', 'Bicycle']
        return words[Math.floor(Math.random() * words.length)]
    }


    render() {
        return(
            <div>
            <h2>Draw A {this.getRandomWord()}</h2>
            <div className='canvas-container' align='center'>
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
                <button onClick={() => {this.setState({"savedCanvas": this.saveableCanvas.getSaveData()})}}>Send To Friend</button>
                {/* <CanvasDraw disabled ref={canvasDraw => (this.loadableCanvas = canvasDraw)} /> */}

            </div>
        )
    }
}

export default Home



