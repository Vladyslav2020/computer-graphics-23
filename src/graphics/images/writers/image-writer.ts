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


export class PPMImageWriter implements ImageWriter {
    write(image: Image, filename?: string): void {
        if (!filename) {
            return;
        }
        const MAX_COLOR_VALUE = 255;
        const header = `P3\n${image.width} ${image.height}\n${MAX_COLOR_VALUE}\n`;

        const pixels = image.pixels.flat();
        const pixelsInPpmFormat = pixels.map((pixel) => {
            const {r, g, b} = pixel.rgbColor;
            const rInPpmFormat = Math.min(Math.round(r), MAX_COLOR_VALUE);
            const gInPpmFormat = Math.min(Math.round(g), MAX_COLOR_VALUE);
            const bInPpmFormat = Math.min(Math.round(b), MAX_COLOR_VALUE);
            return `${rInPpmFormat} ${gInPpmFormat} ${bInPpmFormat}`;
        });

        const ppmData = header + pixelsInPpmFormat.join('\n') + '\n';
        fs.writeFileSync(filename, ppmData);
    }
}
