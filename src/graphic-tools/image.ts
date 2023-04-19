import {Pixel} from "./pixel";

export interface Image {
    width: number;
    height: number;
    pixels: Pixel[][];
}