import {Image} from "./image";

export interface ImageWriter {

    write(image: Image): void;
}

export class ConsoleImageWriter implements ImageWriter {
    write(image: Image): void {
        image.pixels.forEach(row => console.log(row.map(pixel => pixel.getConsoleColor()).join('')));
    }
}
