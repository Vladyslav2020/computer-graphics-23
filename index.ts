import {Vector} from './src/primitives/vector';
import {Camera} from './src/graphic-tools/camera';
import {Screen} from './src/graphic-tools/screen';
import {RayTracer} from './src/ray-tracing/ray-tracer';
import {Sphere} from "./src/shapes/sphere";
import {Disc} from "./src/shapes/disc";
import {Plane} from "./src/shapes/plane";
import {ConsoleImageWriter, ImageWriter} from "./src/graphic-tools/image-writer";

const screenWidth = 40;
const screenHeight = 40;
const screen = new Screen(screenWidth, screenHeight);

const cameraOrigin = new Vector(0, 0, 0);
const cameraLookAt = new Vector(1, 0, 0);
const camera = new Camera(cameraOrigin, cameraLookAt);

const sphere = new Sphere(new Vector(0, 0, 20), 8);
const disc = new Disc(new Vector(-15, 0, 15), new Vector(5, 0, -1), 5);
const plane = new Plane(new Vector(1, 2, -1), new Vector(0, 0, 30));
const objects = [sphere, disc, plane];

const lightDirection = new Vector(1, -1, -1);

const rayTracer = new RayTracer(screen, camera, objects, lightDirection);

const imageWriter: ImageWriter = new ConsoleImageWriter();

let image = rayTracer.trace(false);
imageWriter.write(image);
console.log("------------------------------------------------------------")
image = rayTracer.trace();
imageWriter.write(image);