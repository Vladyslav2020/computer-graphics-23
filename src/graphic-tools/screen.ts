import {Vector} from "../primitives/vector";

export class Screen {
    private readonly _width: number;
    private readonly _height: number;
    private readonly _pixels: string[][];

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._pixels = new Array(height).fill(null).map(() => new Array(width).fill(" "));
    }

    public getPoint(x: number, y: number): Vector {
        const screenCenter: Vector = new Vector(0, 0, 8);
        const screenTopLeft: Vector = new Vector(screenCenter.x - this._width / 2, screenCenter.y - this._height / 2, screenCenter.z);
        const screenXInc: Vector = new Vector(1, 0, 0);
        const screenYInc: Vector = new Vector(0, 1, 0);
        return new Vector(
            screenTopLeft.x + x * screenXInc.x + y * screenYInc.x,
            screenTopLeft.y + x * screenXInc.y + y * screenYInc.y,
            screenTopLeft.z + x * screenXInc.z + y * screenYInc.z,
        );
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
