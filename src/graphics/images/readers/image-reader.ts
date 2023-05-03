import {Image} from "../image";
import {Pixel} from "../../pixel";

export interface ImageReader {
    read(filename: string): Image;
}

export class PpmImageReader implements ImageReader {
    read(filename: string): Image {
        const fs = require('fs');
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

export class BmpImageReader implements ImageReader {

    read(filename: string): Image {
        const fs = require('fs');
        const data = fs.readFileSync(filename);
        const pixelDataOffset = data.readUInt32LE(10);
        const width = data.readInt32LE(18);
        const height = data.readInt32LE(22);
        const bitsPerPixel = data.readInt16LE(28);
        const bytesPerPixel = bitsPerPixel / 8;
        const paddingSize = (4 - (width * bytesPerPixel) % 4) % 4;

        const pixels = this.readPixels(data, width, height, pixelDataOffset, bytesPerPixel, paddingSize);

        return {width, height, pixels};
    }

    private readPixels(data: Buffer, width: number, height: number, pixelDataOffset: number, bytesPerPixel: number, paddingSize: number): Pixel[][] {
        const pixels = [];

        for (let i = height - 1; i >= 0; i--) {
            const row = [];
            const rowIndex = pixelDataOffset + (i * ((width * bytesPerPixel) + paddingSize));
            for (let j = 0; j < width; j++) {
                const pixelIndex = rowIndex + (j * bytesPerPixel);
                const r = data.readUInt8(pixelIndex + 2);
                const g = data.readUInt8(pixelIndex + 1);
                const b = data.readUInt8(pixelIndex);
                row.push(new Pixel({r, g, b}, 1));
            }
            pixels.push(row);
        }
        return pixels;
    }
}
