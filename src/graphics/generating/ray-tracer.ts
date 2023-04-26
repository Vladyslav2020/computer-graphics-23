import {Ray} from "../../primitives/ray";
import {Point} from "../../primitives/point";
import {Camera} from "../tools/camera";
import {Screen} from "../tools/screen";
import {Shape} from "../../shapes/shape";
import {Image} from "../images/image";
import {Pixel} from "../pixel";
import {Light} from "../tools/light";
import {Vector} from "../../primitives/vector";

type Intersection = {
    intersection_point: Point | null;
    shape: Shape | null;
}

export class RayTracer {
    private readonly _screen: Screen;
    private readonly _camera: Camera;
    private readonly _shapes: Shape[];
    private readonly _light: Light;

    constructor(screen: Screen, camera: Camera, shapes: Shape[], light: Light) {
        this._screen = screen;
        this._camera = camera;
        this._shapes = shapes;
        this._light = light;
    }

    public trace(considerLighting = true): Image {
        const image = this.initializeImage();
        for (let y = 0; y < this._screen.height; y++) {
            for (let x = 0; x < this._screen.width; x++) {
                const ray = this._camera.getRay(this._screen, x, y);

                let closestIntersection = this.getClosestIntersection(ray);

                image.pixels[y][x].intensity = this.getColorIntensity({closestIntersection, considerLighting});
            }
        }
        return image;
    }

    private getColorIntensity({considerLighting, closestIntersection}: {
        considerLighting: boolean;
        closestIntersection: Intersection
    }): number {
        if (!this.intersectionFound(closestIntersection)) {
            return -1;
        }
        if (considerLighting) {
            return this.getIntensityAccordingToLighting({closestIntersection});
        } else {
            return 1;
        }
    }

    private getIntensityAccordingToLighting({closestIntersection}: {
        closestIntersection: Intersection
    }): number {
        if (this.isInShade(closestIntersection)) {
            return -1;
        }
        const normal = (closestIntersection.shape as Shape).getNormal(closestIntersection.intersection_point as Point).scale(-1);
        return normal.dot(this._light.direction);
    }

    private isInShade(closestIntersection: Intersection): boolean {
        const ray = new Ray(Vector.fromPoint(closestIntersection.intersection_point as Point), this._light.direction.scale(-1));
        return this.hasIntersection(ray, closestIntersection.shape as Shape);
    }

    private intersectionFound(closestIntersection: Intersection): boolean {
        return !!(closestIntersection.shape && closestIntersection.intersection_point);
    }

    private initializeImage(): Image {
        return {
            width: this._screen.width,
            height: this._screen.height,
            pixels: new Array(this._screen.height).fill(null).map(() => new Array(this._screen.width).fill(null).map(() => new Pixel(this._light.color, -1)))
        };
    }

    private getClosestIntersection(ray: Ray): Intersection {
        let closestIntersection: Point | null = null;
        let closestDistance = Infinity;
        let closestShape: Shape | null = null;

        for (const shape of this._shapes) {
            const intersection = shape.getIntersection(ray);
            if (!intersection) {
                continue;
            }
            const distance = Point.distance(Point.fromVector(this._camera.origin), intersection);
            if (distance < closestDistance) {
                closestIntersection = intersection;
                closestDistance = distance;
                closestShape = shape;
            }
        }
        return {intersection_point: closestIntersection, shape: closestShape};
    }

    private hasIntersection(ray: Ray, ...shapesToExclude: Shape[]): boolean {
        for (let shape of this._shapes) {
            if (shape.hasIntersection(ray) && !shapesToExclude.some(shapeToExclude => shapeToExclude === shape)) {
                return true;
            }
        }
        return false;
    }

    get screen() {
        return this._screen;
    }

    get camera() {
        return this._camera;
    }

    get shapes() {
        return this._shapes;
    }

    get light(): Light {
        return this._light;
    }
}
