import {Vector} from "../../primitives/vector";
import {Transformable} from "../../shapes/transformable";

export class Screen implements Transformable<Screen> {
    public static DEFAULT_SCALE = 1 / 500;
    private readonly _width: number;
    private readonly _height: number;
    private readonly _normal: Vector;
    private readonly _origin: Vector;
    private readonly _screenXInc: Vector;
    private readonly _screenYInc: Vector;
    private readonly _screenTopLeft: Vector

    constructor(width: number, height: number, origin: Vector, normal?: Vector, screenXInc?: Vector, screenYInc?: Vector, screenTopLeft?: Vector) {
        this._width = width;
        this._height = height;
        this._origin = origin;
        if (normal) {
            this._normal = normal.normalize();
            this._screenXInc = screenXInc as Vector;
            this._screenYInc = screenYInc as Vector;
            this._screenTopLeft = screenTopLeft as Vector;
        } else {
            this._normal = new Vector(0, 1, 0);
            this._screenTopLeft = new Vector(origin.x - this._width / 2, origin.y, origin.z + this._height / 2);
            this._screenXInc = new Vector(Screen.DEFAULT_SCALE, 0, 0);
            this._screenYInc = new Vector(0, 0, -Screen.DEFAULT_SCALE);
        }
    }

    public getPoint(x: number, y: number): Vector {
        const screenTopLeft = this._origin.subtract(this._screenXInc.scale(this._width / 2)).subtract(this._screenYInc.scale(this._height / 2));
        return new Vector(
            screenTopLeft.x + x * this._screenXInc.x + y * this._screenYInc.x,
            screenTopLeft.y + x * this._screenXInc.y + y * this._screenYInc.y,
            screenTopLeft.z + x * this._screenXInc.z + y * this._screenYInc.z,
        );
    }

    public transform(matrix: number[][]): Screen {
        const transformedNormal = this._normal.transform(matrix);
        const transformedScreenXInc = this._screenXInc.transform(matrix);
        const transformedScreenYInc = this._screenYInc.transform(matrix);
        const transformedScreenTopLeft = this._screenTopLeft.transform(matrix);
        return new Screen(this._width, this._height, this._origin, transformedNormal, transformedScreenXInc, transformedScreenYInc, transformedScreenTopLeft);
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }
}
