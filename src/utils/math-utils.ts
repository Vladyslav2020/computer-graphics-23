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

    public static multiplyMatrices(matrix1: number[][], matrix2: number[][]): number[][] {
        const result: number[][] = [];

        const rows1 = matrix1.length;
        const cols1 = matrix1[0].length;
        const rows2 = matrix2.length;
        const cols2 = matrix2[0].length;

        if (cols1 !== rows2) {
            throw new Error('Cannot multiply matrices of incompatible sizes');
        }

        for (let i = 0; i < rows1; i++) {
            result[i] = [];
        }

        for (let i = 0; i < rows1; i++) {
            for (let j = 0; j < cols2; j++) {
                let sum = 0;
                for (let k = 0; k < cols1; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                result[i][j] = sum;
            }
        }

        return result;
    }

}