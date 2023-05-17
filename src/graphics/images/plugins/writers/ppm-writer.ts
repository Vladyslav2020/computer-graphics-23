import {Image} from "../../image";
import fs from "fs";
import {ImageWriter} from "../../writers/image-writer";

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

export default new PPMImageWriter();