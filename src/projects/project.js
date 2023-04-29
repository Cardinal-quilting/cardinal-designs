import PointContainer from 'projects/points/point-container';

/**
 * A Cardinal Designs project.
 */
class Project {
    constructor(data) {
        this.metadata = data.metadata;
        
        this.points = new PointContainer();
        this.access_point = this.access_point.bind(this);
        
        this.points.add_point({x:0, y: 0}, false, "global_btm_left");
        this.points.add_point({x:1, y: 0}, false, "global_btm_right");
        this.points.add_point({x:0, y: 1}, false, "global_top_left");
        this.points.add_point({x:1, y: 1}, false, "global_top_right");
    }

    access_point(id) { return this.points.get_point(id); }

    stringify() {
        //JSON.stringify(project)
        return "INFORMATION TO SAVE ABOUT THIS PROJECT";
    }

    display_nodes() {
        return (
            <div>HI</div>
        );
    }
}

export default Project;