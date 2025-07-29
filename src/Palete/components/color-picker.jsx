import { SketchPicker } from 'react-color';

const ColorPicker = ({ selectedColor, onColorChange }) => {
  return (
    <div className="mt-4 w-2/3 mx-auto">
      <SketchPicker 
        color={selectedColor} 
        onChangeComplete={onColorChange} 
        width="100%" 
        height="50" 
      />
    </div>
  );
};

export default ColorPicker;