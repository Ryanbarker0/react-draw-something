import React from 'react';
import { SwatchesPicker } from 'react-color'

const ColorPalette = props => {

    const handleColorChange = ({ hex }) => {
        props.changeColor(hex)
    }


    return (
        <div>
            <SwatchesPicker 
            onChangeComplete={handleColorChange}/>
        </div>
    )
}

export default ColorPalette