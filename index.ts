import {Vector} from './src/primitives/vector';
import {Camera} from './src/graphic-tools/camera';
import {Screen} from './src/graphic-tools/screen';
import {RayTracer} from './src/ray-tracing/ray-tracer';
import {Sphere} from "./src/shapes/sphere";
import {Disc} from "./src/shapes/disc";
import {Plane} from "./src/shapes/plane";
import {ConsoleImageWriter, ImageWriter, PPMImageWriter} from "./src/graphic-tools/image-writer";
import {Light} from "./src/graphic-tools/light";
import {colors} from "./src/graphic-tools/colors";
import {FileParser} from "./src/parsing/file-parser";
import {Triangle} from "./src/shapes/triangle";

const screenWidth = 400;
const screenHeight = 400;

function printPrimitives() {
    const origin = new Vector(0, 0, 8);
    const screenNormal: Vector = new Vector(0, 0, 0);
    const screen = new Screen(screenWidth, screenHeight, origin, screenNormal);

    const cameraOrigin = new Vector(0, 0, 0);
    const cameraLookAt = new Vector(1, 0, 0);
    const camera = new Camera(cameraOrigin, cameraLookAt);

    const sphere = new Sphere(new Vector(0, 0, 20), 8);
    const disc = new Disc(new Vector(-15, 0, 15), new Vector(5, 0, -1), 5);
    const plane = new Plane(new Vector(1, 2, -1), new Vector(0, 0, 30));
    const objects = [sphere, disc, plane];

    const lightDirection = new Vector(1, -1, -1);
    const light = new Light(lightDirection.normalize(), colors.white);

    const rayTracer = new RayTracer(screen, camera, objects, light);

    const imageWriter: ImageWriter = new ConsoleImageWriter();

    let image = rayTracer.trace(false);
    imageWriter.write(image);
    console.log("------------------------------------------------------------")
    image = rayTracer.trace();
    imageWriter.write(image);
}

// printPrimitives();

function getPlane(objects: Triangle[]) {
    let lowestPointZ = Infinity;
    for (let triangle of objects) {
        lowestPointZ = Math.min(lowestPointZ, triangle.vertex1.z, triangle.vertex2.z, triangle.vertex3.z);
    }
    return new Plane(new Vector(0, 0, 1), new Vector(0, 0, lowestPointZ));
}

function printCow() {
    // screen
    const origin = new Vector(0, -15, 0);
    const screenNormal: Vector = new Vector(0, 1, 0);
    const screen = new Screen(screenWidth, screenHeight, origin, screenNormal);

    // camera
    const cameraOrigin = new Vector(0, -1000, 0);
    const cameraLookAt = new Vector(1, 0, 0);
    const camera = new Camera(cameraOrigin, cameraLookAt);

    // light
    const lightDirection = new Vector(-0.2, 1, -0.3);
    const light = new Light(lightDirection.normalize(), colors.white);

    // image processing
    const ppmImageWriter: ImageWriter = new PPMImageWriter();
    const fileParser = new FileParser();
    const objects = fileParser.parseOBJFile('input/cow.obj');
    const plane = getPlane(objects);
    const rayTracer = new RayTracer(screen, camera, [...objects, plane], light);
    const image = rayTracer.trace();
    ppmImageWriter.write(image);
}

printCow();