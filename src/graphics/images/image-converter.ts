import path from "path";
import {ImageExtensions} from "./image-extensions";
import {ImagePluginLoader} from "./image-plugin-loader";

export class ImageConverter {
    public async convertImage() {
        const args = process.argv.slice(2);

        let source: string | undefined;
        let goalFormat: string | undefined;

        if (args.length === 2) {
            let splited = args[0].split('=');
            if (splited[0] === '--source') {
                source = splited[1];
            }
            splited = args[1].split('=');
            if (splited[0] === '--goal-format') {
                goalFormat = splited[1];
            }
        }
        console.log('Source:', source);
        console.log('Goal Format:', goalFormat);

        if (!source || !goalFormat) {
            console.log("source or goal-format params are not specified.")
            process.exit(1);
        }

        const {name: inputFileName, ext} = path.parse(source);

        const supportedExtensions = Object.values(ImageExtensions).values();

        let inputExtensionSupported = false;
        let outputExtensionSupported = false;

        for (let extension of supportedExtensions) {
            if (ext.substring(1) === extension) {
                inputExtensionSupported = true;
            }
            if (goalFormat === extension) {
                outputExtensionSupported = true;
            }
        }

        if (!inputExtensionSupported || !outputExtensionSupported) {
            console.log("Only the following extensions are supported: ", supportedExtensions)
        }

        console.log('Filename:', inputFileName);
        console.log('Extension:', ext);

        const imagePluginLoader = new ImagePluginLoader();
        const image = (await imagePluginLoader.loadImageReader(ext.substring(1))).read(source);

        const directory = path.dirname(source);
        const newFilePath = path.join(directory, `${inputFileName}.${goalFormat}`);
        console.log("new file path:", newFilePath);

        (await imagePluginLoader.loadImageWriter(goalFormat)).write(image, newFilePath);
    }
}