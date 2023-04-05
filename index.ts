import {Vector} from './src/primitives/vector';
import {Sphere} from './src/shapes/sphere';
import {Camera} from './src/graphic-tools/camera';
import {Screen} from './src/graphic-tools/screen';
import {RayTracer} from './src/ray-tracing/ray-tracer';

const screenWidth = 100;
const screenHeight = 100;
const screen = new Screen(screenWidth, screenHeight);

const cameraOrigin = new Vector(0, 0, 0);
const cameraLookAt = new Vector(1, 0, 0);
const camera = new Camera(cameraOrigin, cameraLookAt);

const sphereCenter = new Vector(0, 0, 0);
const sphereRadius = 1;
const sphere = new Sphere(sphereCenter, sphereRadius);
const objects = [sphere];

const lightDirection = new Vector(1, 1, 1);

const rayTracer = new RayTracer(screen, camera, objects, lightDirection);

rayTracer.trace();
