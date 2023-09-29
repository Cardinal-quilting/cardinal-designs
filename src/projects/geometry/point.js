import { UnorderedBulkOperation } from "mongodb";

class Point {
    static next_id = 0;

    constructor(position, options) {
        console.log("point.js", Point.next_id);
        this.position = position;
        this.moveable = options.moveable;
        if( options.name!==undefined ) { this.name = options.name; }
        //this.id = (options.given_id===undefined? Point.next_id++ : options.given_id);
        this.id = Point.next_id++;
    }
}

export default Point;