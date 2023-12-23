// ColourPicker.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColourPicker from '../ColourPicker';
import {ColorPicker, getColorFromString, IColor} from '@fluentui/react';


// Mock the ColorPicker component
jest.mock('../ColourPicker', () => ({ selectedColor, setSelectedColor }) => (
    <div data-testid="color-picker-mock">
        <ColorPicker color={selectedColor} onChange={setSelectedColor} alphaType={"none"} showPreview={true}/>
    </div>
));

describe('ColourPicker', () => {
    test('handles color change', () => {
        // Render the component
        const setSelectedColor = jest.fn();

        const { getByTestId } = render(<ColourPicker selectedColor={'#ff00ff'} setSelectedColor={setSelectedColor}/>);

        // Get the ColorPicker mock instance
        const colorPickerMock = getByTestId('color-picker-mock')

        // Trigger the onClick event
        fireEvent.change(colorPickerMock,{ target: { color: { str: '#00ff00' } } });
        expect(colorPickerMock).toHaveProperty('color',{"str": "#00ff00"})
        expect(setSelectedColor).toHaveBeenCalled();
        // Verify that the onChange function was called with the expected color
        
    });
});
