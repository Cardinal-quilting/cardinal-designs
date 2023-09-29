import Point from "./point";
import Section from "projects/geometry/section";

export class Container {
    static next_id = 0;

    constructor() {
        this.cloud = {}
    }

    get(id) { return this.cloud[id]; }

    add(obj) { this.cloud[obj.id] = obj; }
}

export class PointContainer extends Container {
    add_point(pos, moveable=true, point=undefined) {
        const pt = new Point(pos, moveable, point);
        this.cloud[pt.id] = pt;

        return pt.id;
    }
}

export class SectionContainer extends Container {
    add_section(points, access_point) {
        const sec = new Section(points, access_point);
        this.cloud[sec.id] = sec;

        return sec.id;
    }
}
