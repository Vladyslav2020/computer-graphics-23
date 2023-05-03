import {Vector} from './src/primitives/vector';
import {Camera} from './src/graphics/tools/camera';
import {Screen} from './src/graphics/tools/screen';
import {RayTracer} from './src/graphics/generating/ray-tracer';
import {Plane} from "./src/shapes/plane";
import {
    BMPImageWriter,
    ImageWriter,
    PPMImageWriter,
    TextFileImageWriter
} from "./src/graphics/images/writers/image-writer";
import {Light} from "./src/graphics/tools/light";
import {colors} from "./src/graphics/colors";
import {FileParser} from "./src/utils/parsing/file-parser";
import {Triangle} from "./src/shapes/triangle";
import {MathUtils} from "./src/utils/math-utils";
import {Shape} from "./src/shapes/shape";

const screenWidth = 600;
const screenHeight = 350;

function getPlane(objects: Shape[]) {
    let lowestPointZ = Infinity;
    for (let triangle of objects as Triangle[]) {
        lowestPointZ = Math.min(lowestPointZ, triangle.vertex1.z, triangle.vertex2.z, triangle.vertex3.z);
    }
    return new Plane(new Vector(0, 0, 1), new Vector(0, 0, lowestPointZ));
}

function transformShapes(shapes: Shape[], transformMatrix: number[][]) {
    for (let i = 0; i < shapes.length; i++) {
        shapes[i] = shapes[i].transform(transformMatrix);
    }
}

function getTransformationMatrix() {
    return MathUtils.multiplyMatrices(MathUtils.getScalingMatrix(500, 500, 500),
        MathUtils.multiplyMatrices(MathUtils.getRotationXMatrix(MathUtils.degToRad(90)),
            MathUtils.getTranslationMatrix(10, 0, 0)));
}

function printCow() {
    const transformMatrix = getTransformationMatrix();

    // prepare screen
    const origin = new Vector(0, -0.03, 0);
    const screen = new Screen(screenWidth, screenHeight, origin).transform(transformMatrix);

    // prepare camera
    const cameraOrigin = new Vector(0, -2, 0);
    const cameraLookAt = new Vector(1, 0, 0);
    const camera = new Camera(cameraOrigin, cameraLookAt).transform(transformMatrix);

    // prepare light
    const lightDirection = new Vector(-0.2, 1, -0.3);
    const light = new Light(lightDirection, colors.white).transform(transformMatrix);

    // parse .obj file
    const fileParser = new FileParser();
    let shapes: Shape[] = fileParser.parseOBJFile('input/cow.obj');
    const plane = getPlane(shapes);
    shapes = [...shapes, plane];

    // prepare shapes
    transformShapes(shapes, transformMatrix);

    const rayTracer = new RayTracer(screen, camera, shapes, light);

    // perform ray tracing
    const image = rayTracer.trace();

    // output results
    const textFileImageWriter = new TextFileImageWriter();
    textFileImageWriter.write(image, 'out/console-output.txt');
    const bmpImageWriter: ImageWriter = new BMPImageWriter();
    bmpImageWriter.write(image, 'out/result.bmp');
    const ppmImageWriter = new PPMImageWriter();
    ppmImageWriter.write(image, 'out/result.ppm');
}

printCow();