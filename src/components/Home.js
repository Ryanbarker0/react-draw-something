import React, { Component } from 'react';
import CanvasDraw from "react-canvas-draw";

class Home extends Component {

    state = {
        color: "#0000FF",
        width: 400,
        height: 400,
        "savedCanvas": undefined
    }

    getRandomWord = () => {
        const words = ['Rabbit', 'Cat', 'Dog', 'Wolf', 'Tree']
        return words[Math.floor(Math.random() * words.length)]
    }


    render() {
        return(
            <div>
            <h2>Draw A {this.getRandomWord()}</h2>
            <div className='canvas-container' align='center'>
                <CanvasDraw 
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={this.state.color}
                    canvasWidth={this.state.width}
                    canvasHeight={this.state.height}
                />
                </div>
                <button onClick={() => {this.setState({"savedCanvas": this.saveableCanvas.getSaveData()})}}>Send To Friend</button>
                {/* <CanvasDraw disabled ref={canvasDraw => (this.loadableCanvas = canvasDraw)} /> */}

            </div>
        )
    }
}

export default Home



