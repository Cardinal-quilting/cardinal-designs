import PointContainer from "projects/geometry/points/point-container";

import Section from "projects/geometry/sections/section";

class Geometry {
    constructor() {
        this.points = new PointContainer();
        this.access_point = this.access_point.bind(this);
        
        const btm_left = this.points.add_point({x:0, y: 0}, false, "global_btm_left");
        const btm_right = this.points.add_point({x:1, y: 0}, false, "global_btm_right");
        const top_left = this.points.add_point({x:0, y: 1}, false, "global_top_left");
        const top_right = this.points.add_point({x:1, y: 1}, false, "global_top_right");

        this.whole_project = new Section([btm_left, btm_right, top_left, top_right], this.access_point); 
    }

    access_point(id) { return this.points.get_point(id); }
}

export default Geometry;