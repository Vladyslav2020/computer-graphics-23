import {Image} from "../../image";
import fs from "fs";
import {Pixel} from "../../../pixel";
import {ImageReader} from "../../readers/image-reader";

export class BmpImageReader implements ImageReader {

    read(filename: string): Image {
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