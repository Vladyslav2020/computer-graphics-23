import {Point} from "./point";

export class Vector {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _z: number;

    constructor(x: number, y: number, z: number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public static of(vector1: Vector, vector2: Vector): Vector {
        const dx = vector2.x - vector1.x;
        const dy = vector2.y - vector1.y;
        const dz = vector2.z - vector1.z;
        return new Vector(dx, dy, dz);
    }

    public static fromPoint(point: Point): Vector {
        return new Vector(point.x, point.y, point.z);
    }

    public static subtract(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    public static dot(v1: Vector, v2: Vector): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    cross(other: Vector): Vector {
        const x = this._y * other._z - this._z * other._y;
        const y = this._z * other._x - this._x * other._z;
        const z = this._x * other._y - this._y * other._x;
        return new Vector(x, y, z);
    }


    static cross(a: Vector, b: Vector): Vector {
        return new Vector(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x,
        );
    }

    subtract(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    scale(factor: number): Vector {
        return new Vector(this.x * factor, this.y * factor, this.z * factor);
    }

    normalize(): Vector {
        const length = this.length();
        if (length === 0) {
            return new Vector(0, 0, 0);
        } else {
            const inverseLength = 1 / length;
            const normalizedX = this._x * inverseLength;
            const normalizedY = this._y * inverseLength;
            const normalizedZ = this._z * inverseLength;
            return new Vector(normalizedX, normalizedY, normalizedZ);
        }
    }

    length(): number {
        return Math.sqrt(this._x ** 2 + this._y ** 2 + this._z ** 2);
    }

    dot(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    public transform(matrix: number[][]): Vector {
        const x = matrix[0][0] * this._x + matrix[0][1] * this._y + matrix[0][2] * this._z;
        const y = matrix[1][0] * this._x + matrix[1][1] * this._y + matrix[1][2] * this._z;
        const z = matrix[2][0] * this._x + matrix[2][1] * this._y + matrix[2][2] * this._z;
        return new Vector(x, y, z);
    }


    add(vector: Vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get z(): number {
        return this._z;
    }
}