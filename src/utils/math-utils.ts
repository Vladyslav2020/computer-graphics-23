export class MathUtils {

    public static degToRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    public static getTranslationMatrix = (dx: number, dy: number, dz: number) => [
        [1, 0, 0, dx],
        [0, 1, 0, dy],
        [0, 0, 1, dz],
        [0, 0, 0, 1],
    ];

    public static getScalingMatrix = (sx: number, sy: number, sz: number) => [
        [sx, 0, 0, 0],
        [0, sy, 0, 0],
        [0, 0, sz, 0],
        [0, 0, 0, 1],
    ];

    public static getRotationXMatrix = (theta: number) => [
        [1, 0, 0, 0],
        [0, Math.cos(theta), -Math.sin(theta), 0],
        [0, Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 0, 1],
    ];

    public static getRotationYMatrix = (theta: number) => [
        [Math.cos(theta), 0, Math.sin(theta), 0],
        [0, 1, 0, 0],
        [-Math.sin(theta), 0, Math.cos(theta), 0],
        [0, 0, 0, 1],
    ];

    public static getRotationZMatrix = (theta: number) => [
        [Math.cos(theta), -Math.sin(theta), 0, 0],
        [Math.sin(theta), Math.cos(theta), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];
}