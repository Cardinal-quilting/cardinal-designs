import Point from "projects/geometry/points/point";

class Section {
    constructor(points, access_point) {
        // access points from the section container
        this.access_point = access_point;

        // get the center point
        this.center = this.compute_center(points);

        // store the points in a clockwise order
        this.point_distance = this.point_distance.bind(this);
        this.points = points.sort(this.point_distance);
        
        this.id = Section.count++;
    }

    static count = 0;

    compute_center(points) {
        var center = new Point({x: 0, y: 0})
        for( let i=0; i<points.length; ++i ) {
            center.position.x += this.access_point(points[i]).position.x;
            center.position.y += this.access_point(points[i]).position.y;
        }
        center.position.x /= points.length;
        center.position.y /= points.length;

       return center;
    }

    point_distance(id1, id2) {
        const det = (p) => { 
            const x = p.position.x-this.center.position.x;
            const y = p.position.y-this.center.position.y;
            const norm = Math.sqrt(x*x + y*y);

            // first quadrant 
            if( x>=0 & y>=0 ) { return y/norm; }
            // second quadrant 
            if( x>=0 & y<=0 ) { return y/norm + Math.PI; }
            // third quadrant 
            if( x<=0 & y<=0 ) { return y/norm + 3.0*Math.PI/2.0; }
            // forth quadrant 
            return y/norm + 3.0*Math.PI/2.0;
        }
        return det(this.access_point(id1))-det(this.access_point(id2)); 
    }
}

export default Section;