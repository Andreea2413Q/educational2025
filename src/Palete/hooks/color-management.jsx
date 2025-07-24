import { useState } from 'react';

export const useColorManagement = () => {
  const [colors, setColors] = useState([]);
  const [generatedColors, setGeneratedColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [colorFormat, setColorFormat] = useState('HEX');
  const [hoveredColor, setHoveredColor] = useState(null);

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgbToHex = ({ r, g, b }) => {
    const toHex = (c) => c.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const hexToHsl = (hex) => {const { r, g, b } = hexToRgb(hex);
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const formatColorText = (color) => {
    switch (colorFormat) {
      case 'RGB':
        const rgb = hexToRgb(color);
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'HSL':
        const hsl = hexToHsl(color);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      default:
        return color.toUpperCase();
    }
  };

  const copyColorToClipboard = async (color) => {
    try {
      const textToCopy = formatColorText(color);
      await navigator.clipboard.writeText(textToCopy);
    } catch (error) {
      const textToCopy = formatColorText(color);
      prompt('Copy this color manually:', textToCopy);
    }
  };

  const generateSimilarColor = (hexColor) => {
    const rgb = hexToRgb(hexColor);
    const variation = 30;

    const modifyComponent = (comp) => {
      let newValue = comp + (Math.floor(Math.random() * (variation * 2 + 1)) - variation);
      if (newValue < 0) newValue = 0;
      if (newValue > 255) newValue = 255;
      return newValue;
    };

    const newRgb = {
      r: modifyComponent(rgb.r),
      g: modifyComponent(rgb.g),
      b: modifyComponent(rgb.b),
    };

    return rgbToHex(newRgb);
  };

  const generateSimilarColors = () => {
    const newColors = [];

    for (let i = 0; i < 5; i++) {
      const newColor = generateSimilarColor(selectedColor);
      if (!generatedColors.includes(newColor) && !newColors.includes(newColor)) {
        newColors.push(newColor);
      }
    }

    if (newColors.length > 0) {
      setGeneratedColors(newColors);
    }
  };

  const addColor = () => {
    if (!colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
    }
  };

  const addGeneratedColor = (color) => {
    if (!colors.includes(color)) {
      setColors([...colors, color]);
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter(color => color !== colorToRemove));
  };

  const resetColors = () => {
    setColors([]);
    setGeneratedColors([]);
  };

  const changeColor = (color) => {
    setSelectedColor(color.hex);
  };

  return {
    colors,
    setColors,
    generatedColors,
    setGeneratedColors,
    selectedColor,
    setSelectedColor,
    colorFormat,
    setColorFormat,
    hoveredColor,
    setHoveredColor,
    formatColorText,
    copyColorToClipboard,
    generateSimilarColors,
    addColor,
    addGeneratedColor,
    removeColor,
    resetColors,
    changeColor
  };
}