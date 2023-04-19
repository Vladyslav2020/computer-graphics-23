import {Vector} from "../primitives/vector";
import {Ray} from "../primitives/ray";
import {Point} from "../primitives/point";
import {Sphere} from "../shapes/sphere";
import {Camera} from "../graphic-tools/camera";
import {Screen} from "../graphic-tools/screen";
import {Shape} from "../shapes/shape";
import {Image} from "../graphic-tools/image";
import {Pixel} from "../graphic-tools/pixel";

type Intersection = {
    intersection_point: Point | null;
    shape: Shape | null;
}

export class RayTracer {
    private readonly _screen: Screen;
    private readonly _camera: Camera;
    private readonly _shapes: Shape[];
    private readonly _lightDirection: Vector;

    constructor(screen: Screen, camera: Camera, shapes: Shape[], lightDirection: Vector) {
        this._screen = screen;
        this._camera = camera;
        this._shapes = shapes;
        this._lightDirection = lightDirection.normalize();
    }

    public trace(considerLighting = true): Image {
        const image = this.initializeImage();
        for (let y = 0; y < this._screen.height; y++) {
            for (let x = 0; x < this._screen.width; x++) {
                const ray = this._camera.getRay(this._screen, x, y);

                let closestIntersection = this.getClosestIntersection(ray);

                this.setPixel({
                    image, x, y, closestIntersection, considerLighting
                });
            }
        }
        return image;
    }

    private setPixel({image, x, y, closestIntersection, considerLighting}: {
        image: Image,
        x: number,
        y: number,
        closestIntersection: Intersection,
        considerLighting: boolean
    }) {
        if (!this.intersectionFound(closestIntersection)) {
            image.pixels[y][x].value = -1;
            return;
        }
        if (considerLighting) {
            this.setPixelAccordingToLighting({image, x, y, closestIntersection});
        } else {
            image.pixels[y][x].value = 1;
        }
    }

    private intersectionFound(closestIntersection: Intersection): boolean {
        return !!(closestIntersection.shape && closestIntersection.intersection_point);
    }

    private initializeImage(): Image {
        return {
            width: this._screen.width,
            height: this._screen.height,
            pixels: new Array(this._screen.height).fill(null).map(() => new Array(this._screen.width).fill(null).map(() => new Pixel(-1)))
        };
    }

    private setPixelAccordingToLighting({image, x, y, closestIntersection}: {
        image: Image,
        x: number,
        y: number,
        closestIntersection: Intersection
    }) {
        const normal = (closestIntersection.shape as Sphere).getNormal(closestIntersection.intersection_point as Point);
        image.pixels[y][x].value = normal.dot(this._lightDirection);
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

    get screen() {
        return this._screen;
    }

    get camera() {
        return this._camera;
    }

    get shapes() {
        return this._shapes;
    }

    get lightDirection() {
        return this._lightDirection;
    }
}
