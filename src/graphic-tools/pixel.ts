type RGBColor = {
    r: number;
    g: number;
    b: number;
}

export class Pixel {
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    getRGBColor(): RGBColor {
        return {
            r: this._value * 255,
            g: this._value * 255,
            b: this._value * 255,
        };
    }

    getConsoleColor(): string {
        if (this._value >= 0 && this._value < 0.2) {
            return '.';
        } else if (this._value >= 0.2 && this._value < 0.5) {
            return '*';
        } else if (this._value >= 0.5 && this._value < 0.8) {
            return 'O';
        } else if (this._value >= 0.8) {
            return '#';
        } else {
            return ' ';
        }
    }
}
