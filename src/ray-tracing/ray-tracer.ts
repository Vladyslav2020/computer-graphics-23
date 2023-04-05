import * as process from 'process';
import {Vector} from "../primitives/vector";
import {Ray} from "../primitives/ray";
import {Point} from "../primitives/point";
import {Sphere} from "../shapes/sphere";
import {Camera} from "../graphic-tools/camera";
import {Screen} from "../graphic-tools/screen";

export class RayTracer {
    private readonly _screen: Screen;
    private readonly _camera: Camera;
    private readonly _objects: Sphere[];
    private readonly _lightDirection: Vector;

    constructor(screen: Screen, camera: Camera, objects: Sphere[], lightDirection: Vector) {
        this._screen = screen;
        this._camera = camera;
        this._objects = objects;
        this._lightDirection = lightDirection.normalize();
    }

    public trace() {
        for (let y = 0; y < this._screen.height; y++) {
            for (let x = 0; x < this._screen.width; x++) {
                const ray = this._camera.getRay(this._screen, x, y);

                let closestIntersection = this.getClosestIntersection(ray);

                if (closestIntersection && closestIntersection.object && closestIntersection.intersection_point) {
                    const normal = closestIntersection.object.getNormal(closestIntersection.intersection_point);
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
                    process.stdout.write('.');
                } else {
                    this._screen.setPixel(x, y, " ");
                    process.stdout.write(' ');
                }
            }
            process.stdout.write('\n');
        }

        this._screen.render();
    }

    private getClosestIntersection(ray: Ray) {
        let closestIntersection: Point | null = null;
        let closestDistance = Infinity;
        let closestObject: Sphere | null = null;

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
