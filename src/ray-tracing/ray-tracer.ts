import {Vector} from "../primitives/vector";
import {Ray} from "../primitives/ray";
import {Point} from "../primitives/point";
import {Sphere} from "../shapes/sphere";
import {Camera} from "../graphic-tools/camera";
import {Screen} from "../graphic-tools/screen";
import {Shape} from "../shapes/shape";

type Intersection = {
    intersection_point: Point | null;
    object: Shape | null;
}

export class RayTracer {
    private readonly _screen: Screen;
    private readonly _camera: Camera;
    private readonly _objects: Shape[];
    private readonly _lightDirection: Vector;

    constructor(screen: Screen, camera: Camera, objects: Shape[], lightDirection: Vector) {
        this._screen = screen;
        this._camera = camera;
        this._objects = objects;
        this._lightDirection = lightDirection.normalize();
    }

    public trace(considerLighting = true) {
        for (let y = 0; y < this._screen.height; y++) {
            for (let x = 0; x < this._screen.width; x++) {
                const ray = this._camera.getRay(this._screen, x, y);

                let closestIntersection = this.getClosestIntersection(ray);

                if (closestIntersection.object && closestIntersection.intersection_point) {
                    if (considerLighting) {
                        this.setPixelAccordingToLighting(closestIntersection, x, y);
                    } else {
                        this._screen.setPixel(x, y, "#");
                    }
                } else {
                    this._screen.setPixel(x, y, " ");
                }
            }
        }
        this._screen.render();
    }

    private setPixelAccordingToLighting(closestIntersection: Intersection, x: number, y: number) {
        const normal = (closestIntersection.object as Sphere).getNormal(closestIntersection.intersection_point as Point);
        const dotProduct = normal.dot(this._lightDirection);

        if (dotProduct >= 0 && dotProduct < 0.2) {
            this._screen.setPixel(x, y, ".");
        } else if (dotProduct >= 0.2 && dotProduct < 0.5) {
            this._screen.setPixel(x, y, "*");
        } else if (dotProduct >= 0.5 && dotProduct < 0.8) {
            this._screen.setPixel(x, y, "O");
        } else if (dotProduct >= 0.8) {
            this._screen.setPixel(x, y, "#");
        } else {
            this._screen.setPixel(x, y, " ");
        }
    }

    private getClosestIntersection(ray: Ray): Intersection {
        let closestIntersection: Point | null = null;
        let closestDistance = Infinity;
        let closestObject: Shape | null = null;

        for (const object of this._objects) {
            const intersections = object.getIntersection(ray);
            if (intersections.length > 0) {
                for (let intersection of intersections) {
                    const distance = Point.distance(Point.fromVector(this._camera.origin), intersection);
                    if (distance < closestDistance) {
                        closestIntersection = intersection;
                        closestDistance = distance;
                        closestObject = object;
                    }
                }
            }
        }
        return {intersection_point: closestIntersection, object: closestObject};
    }

    get screen() {
        return this._screen;
    }

    get camera() {
        return this._camera;
    }

    get objects() {
        return this._objects;
    }

    get lightDirection() {
        return this._lightDirection;
    }
}
