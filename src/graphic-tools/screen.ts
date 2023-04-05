export class Screen {
    private readonly _width: number;
    private readonly _height: number;
    private readonly _pixels: string[][];

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._pixels = new Array(height).fill(null).map(() => new Array(width).fill(" "));
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get pixels() {
        return this._pixels;
    }

    setPixel(x: number, y: number, value: string) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return;
        }
        this._pixels[y][x] = value;
    }

    render() {
        for (let row of this._pixels) {
            console.log(row.join(""));
        }
    }
}
