import Point from "projects/geometry/points/point";

class PointContainer {
    constructor() {
        this.cloud = {}
    }

    add_point(pos, name=undefined) {
        const pt = new Point(pos, name);
        this.cloud[pt.id] = pt;

        return pt.id;
    }

    get_point(id) { return this.cloud[id]; }
}

export default PointContainer;