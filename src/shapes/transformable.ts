export interface Transformable<T> {

    transform(matrix: number[][]): T;
}