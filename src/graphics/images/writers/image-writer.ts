import {Image} from "../image";
import * as fs from "fs";

export interface ImageWriter {

    write(image: Image, filename?: string): void;
}

export class ConsoleImageWriter implements ImageWriter {
    write(image: Image, filename?: string): void {
        image.pixels.forEach(row => console.log(row.map(pixel => pixel.getConsoleColor()).join('')));
    }
}

export class TextFileImageWriter implements ImageWriter {

    write(image: Image, filename?: string): void {
        if (!filename) {
            return;
        }
        const fileContent = image.pixels.map(row => row.map(pixel => pixel.getConsoleColor()).join('')).join('\n');
        fs.writeFileSync(filename, fileContent, 'utf-8');
    }
}
