import {RGBColor} from "./colors";

export class Pixel {
    private _rgbColor: RGBColor;
    private _intensity: number;

    constructor(rgbColor: RGBColor, intensity: number) {
        this._rgbColor = rgbColor;
        this._intensity = intensity;
    }

    get rgbColor(): RGBColor {
        return {
            r: Math.max(this._rgbColor.r * this._intensity, 0),
            g: Math.max(this._rgbColor.g * this._intensity, 0),
            b: Math.max(this._rgbColor.b * this._intensity, 0),
        };
    }

    public getBytes(): number {
        const r = this._rgbColor.r << 24;
        const g = this._rgbColor.g << 16;
        const b = this._rgbColor.b << 8;
        const i = Math.floor(this._intensity * 255);
        return r | g | b | i;
    }

    set rgbColor(value: RGBColor) {
        this._rgbColor = value;
    }

    get intensity(): number {
        return this._intensity;
    }

    set intensity(value: number) {
        this._intensity = value;
    }

    getConsoleColor(): string {
        if (this._intensity >= 0 && this._intensity < 0.2) {
            return '.';
        } else if (this._intensity >= 0.2 && this._intensity < 0.5) {
            return '*';
        } else if (this._intensity >= 0.5 && this._intensity < 0.8) {
            return 'O';
        } else if (this._intensity >= 0.8) {
            return '#';
        } else {
            return ' ';
        }
    }
}
