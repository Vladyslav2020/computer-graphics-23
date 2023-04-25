export type RGBColor = {
    r: number;
    g: number;
    b: number;
}

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
