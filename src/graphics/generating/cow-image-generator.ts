import {Vector} from "../../primitives/vector";
import {Screen} from "../tools/screen";
import {Camera} from "../tools/camera";
import {Light} from "../tools/light";
import {colors} from "../colors";
import {FileParser} from "../../utils/parsing/file-parser";
import {Shape} from "../../shapes/shape";
import {RayTracer} from "./ray-tracer";
import {ImageWriter, TextFileImageWriter} from "../images/writers/image-writer";
import {Triangle} from "../../shapes/triangle";
import {Plane} from "../../shapes/plane";
import {MathUtils} from "../../utils/math-utils";
import {BMPImageWriter} from "../images/plugins/writers/bmp-writer";
import {PPMImageWriter} from "../images/plugins/writers/ppm-writer";

export class CowImageGenerator {
    public static SCREEN_WIDTH = 600;
    public static SCREEN_HEIGHT = 350;

    public printCow() {
        const transformMatrix = this.getTransformationMatrix();

        // prepare screen
        const origin = new Vector(0, -0.03, 0);
        const screen = new Screen(CowImageGenerator.SCREEN_WIDTH, CowImageGenerator.SCREEN_HEIGHT, origin).transform(transformMatrix);

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
        const plane = this.getPlane(shapes);
        shapes = [...shapes, plane];

        // prepare shapes
        this.transformShapes(shapes, transformMatrix);

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

    private getPlane(objects: Shape[]) {
        let lowestPointZ = Infinity;
        for (let triangle of objects as Triangle[]) {
            lowestPointZ = Math.min(lowestPointZ, triangle.vertex1.z, triangle.vertex2.z, triangle.vertex3.z);
        }
        return new Plane(new Vector(0, 0, 1), new Vector(0, 0, lowestPointZ));
    }

    private transformShapes(shapes: Shape[], transformMatrix: number[][]) {
        for (let i = 0; i < shapes.length; i++) {
            shapes[i] = shapes[i].transform(transformMatrix);
        }
    }

    private getTransformationMatrix() {
        return MathUtils.multiplyMatrices(MathUtils.getScalingMatrix(500, 500, 500),
            MathUtils.multiplyMatrices(MathUtils.getRotationXMatrix(MathUtils.degToRad(90)),
                MathUtils.getTranslationMatrix(10, 0, 0)));
    }
}
