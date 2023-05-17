import {Image} from "../image";

export interface ImageReader {
    read(filename: string): Image;
}
