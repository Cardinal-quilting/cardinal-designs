class Point {
    constructor(position, moveable=true, name=undefined) {
        this.position = position;
        this.moveable = moveable;
        if( name!==undefined ) { this.name = name; }
        this.id = Point.count++;
    }

    static count = 0;
}

export default Point;