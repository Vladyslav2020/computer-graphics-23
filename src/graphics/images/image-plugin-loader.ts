import {ImageReader} from "./readers/image-reader";
import {ImageWriter} from "./writers/image-writer";

export class ImagePluginLoader {
    private readerMap: { [extension: string]: ImageReader } = {};

    private writerMap: { [extension: string]: ImageWriter } = {};

    async loadImageReader(extension: string): Promise<ImageReader> {
        if (this.readerMap[extension]) {
            return this.readerMap[extension];
        }
        const readerPath = __dirname + `\\plugins\\readers\\${extension}-reader.js`;
        const imageReaderModule = await import(readerPath);
        const imageReader: ImageReader = imageReaderModule.default;
        this.readerMap[extension] = imageReader;
        return imageReader;
    }

    async loadImageWriter(extension: string): Promise<ImageWriter> {
        if (this.writerMap[extension]) {
            return this.writerMap[extension];
        }
        const imageWriterPath = __dirname + `\\plugins\\writers\\${extension}-writer.js`;
        const imageWriterModule = await import(imageWriterPath);
        const imageWriter: ImageWriter = imageWriterModule.default;
        this.writerMap[extension] = imageWriter;
        return imageWriter;
    }
}