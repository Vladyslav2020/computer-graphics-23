import {Image} from "../../image";
import fs from "fs";
import {Pixel} from "../../../pixel";
import {ImageReader} from "../../readers/image-reader";

export class PpmImageReader implements ImageReader {
    read(filename: string): Image {
        const data = fs.readFileSync(filename, 'utf-8');
        const lines = data.trim().split('\n');

        const [width, height] = lines[1].split(' ').map(Number);
        const maxIntensity = Number(lines[2]);

        const pixels = this.getPixels(lines, width, maxIntensity);

        return {width, height, pixels};
    }

    private getPixels(lines: string[], width: number, maxIntensity: number): Pixel[][] {
        const pixels = [];
        let row = [];
        for (let i = 3; i < lines.length; i++) {
            const rowValues = lines[i].trim().split(' ').map(Number);
            for (let j = 0; j < rowValues.length; j += 3) {
                const [r, g, b] = rowValues.slice(j, j + 3);
                row.push(new Pixel({
                    r: r * 255 / maxIntensity,
                    g: g * 255 / maxIntensity,
                    b: b * 255 / maxIntensity
                }, 1));
            }
            if (row.length === width) {
                pixels.push(row);
                row = [];
            }
        }
        return pixels;
    }
}