import {Image} from "../../image";
import fs from "fs";
import {ImageWriter} from "../../writers/image-writer";

export class BMPImageWriter implements ImageWriter {
    public static FILE_HEADER_SIZE = 14;
    public static INFO_HEADER_SIZE = 40;
    public static BITS_PER_PIXEL = 24;

    write(image: Image, filename?: string): void {
        if (!filename) {
            return;
        }
        const bmpBuffer: Buffer = this.getBufferWithImage(image);
        fs.writeFileSync(filename, bmpBuffer);
    }

    private getBufferWithImage(image: Image): Buffer {
        const rowPaddingSize = (4 - ((image.width * (BMPImageWriter.BITS_PER_PIXEL / 8)) % 4)) % 4;
        const fileSize = BMPImageWriter.FILE_HEADER_SIZE + BMPImageWriter.INFO_HEADER_SIZE + (image.height * (image.width * (BMPImageWriter.BITS_PER_PIXEL / 8) + rowPaddingSize));
        const buffer = this.getBufferWithFilledHeaders(fileSize, image);
        this.writePixelsToBuffer(image, buffer, rowPaddingSize);
        return buffer;
    }

    private writePixelsToBuffer(image: Image, bmpBuffer: Buffer, rowPaddingSize: number) {
        let offset = BMPImageWriter.FILE_HEADER_SIZE + BMPImageWriter.INFO_HEADER_SIZE;
        for (let y = image.height - 1; y >= 0; y--) {
            for (let x = 0; x < image.width; x++) {
                const pixel = image.pixels[y][x];
                const {r, g, b} = pixel.rgbColor;
                bmpBuffer.writeUInt8(b, offset);
                bmpBuffer.writeUInt8(g, offset + 1);
                bmpBuffer.writeUInt8(r, offset + 2);
                offset += 3;
            }
            offset = this.appendPadding(bmpBuffer, rowPaddingSize, offset);
        }
    }

    private appendPadding(bmpBuffer: Buffer, rowPaddingSize: number, offset: number) {
        for (let i = 0; i < rowPaddingSize; i++) {
            bmpBuffer.writeUInt8(0, offset);
            offset++;
        }
        return offset;
    }

    private getBufferWithFilledHeaders(fileSize: number, image: Image) {
        const bmpBuffer = Buffer.alloc(fileSize);

        bmpBuffer.write("BM", 0);
        bmpBuffer.writeUInt32LE(fileSize, 2);
        bmpBuffer.writeUInt32LE(BMPImageWriter.FILE_HEADER_SIZE + BMPImageWriter.INFO_HEADER_SIZE, 10);
        bmpBuffer.writeUInt32LE(BMPImageWriter.INFO_HEADER_SIZE, 14);
        bmpBuffer.writeInt32LE(image.width, 18);
        bmpBuffer.writeInt32LE(image.height, 22);
        bmpBuffer.writeUInt16LE(1, 26);
        bmpBuffer.writeUInt16LE(BMPImageWriter.BITS_PER_PIXEL, 28);
        bmpBuffer.writeUInt32LE(0, 30);
        bmpBuffer.writeUInt32LE(0, 34);
        bmpBuffer.writeInt32LE(0, 38);
        bmpBuffer.writeInt32LE(0, 42);
        bmpBuffer.writeUInt32LE(0, 46);
        bmpBuffer.writeUInt32LE(0, 50);
        return bmpBuffer;
    }
}

export default new BMPImageWriter();