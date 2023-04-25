import {Triangle} from "../shapes/triangle";
import {Vector} from "../primitives/vector";
import * as fs from "fs";


export class FileParser {

    public parseOBJFile(filename: string): Triangle[] {
        const fileContent = fs.readFileSync(filename, 'utf-8');
        const lines = fileContent.split('\n');
        const vertices: Vector[] = [];
        const triangles: Triangle[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('v ')) {
                const values = line.split(' ').slice(1).map(parseFloat);
                vertices.push(new Vector(values[0], values[1], values[2]));
            } else if (line.startsWith('f ')) {
                const values = line.split(' ').slice(1);
                const p1 = vertices[parseInt(values[0]) - 1];
                const p2 = vertices[parseInt(values[1]) - 1];
                const p3 = vertices[parseInt(values[2]) - 1];
                triangles.push(new Triangle(p1, p2, p3));
            }
        }
        return triangles;
    }
}