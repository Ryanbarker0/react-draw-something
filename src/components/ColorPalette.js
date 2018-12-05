import React from 'react';
import { SwatchesPicker } from 'react-color'

const ColorPalette = props => {

    const handleColorChange = ({ hex }) => {
        props.changeColor(hex)
    }

    return (
        <div>
            <SwatchesPicker
                height={440}
                width={390}
                onChangeComplete={handleColorChange}/>
        </div>
    )
}

export default ColorPalette