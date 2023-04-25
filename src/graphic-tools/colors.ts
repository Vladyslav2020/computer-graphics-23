import {RGBColor} from "./pixel";

type PreDefinedColors = 'white' | 'black' | 'green' | 'red' | 'blue';
export const colors: { [key in PreDefinedColors]: RGBColor } = {
    white: {r: 255, g: 255, b: 255},
    black: {r: 0, g: 0, b: 0},
    green: {r: 0, g: 255, b: 0},
    red: {r: 255, g: 0, b: 0},
    blue: {r: 0, g: 0, b: 255},
}