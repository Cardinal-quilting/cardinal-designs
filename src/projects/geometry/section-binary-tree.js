import {Container, PointContainer, SectionContainer} from "projects/geometry/containers";

class Node {
    constructor(section_id) {
        this.id = section_id;
        this.left = null; 
        this.right = null;
    }
}

class SectionBinaryTree {
    constructor() {
        // a container for all of the points
        this.points = new PointContainer();
        this.get_point = this.get_point.bind(this);

        // a container for all of the sections
        this.sections = new SectionContainer();
        this.get_section = this.get_section.bind(this);
        this.split_section = this.split_section.bind(this);

        // a container for all of the nodes in the tree
        this.nodes = new Container();
        
        // the corners of the project
        const btm_left = this.points.add_point({x: 0, y: 0}, {movable: false, name: "global_btm_left"});
        const btm_right = this.points.add_point({x: 1, y: 0}, {movable: false, name: "global_btm_right"});
        const top_left = this.points.add_point({x: 0, y: 1}, {moveable: false, name: "global_top_left"});
        const top_right = this.points.add_point({x: 1, y: 1}, {moveable: false, name: "global_top_right"});

        // create a section that is the whole project and add it
        const head_node = new Node(this.sections.add_section([btm_left, btm_right, top_left, top_right], this.get_point));
        this.nodes.add(head_node);
        this.leaf_nodes = [head_node.id]
    }

    get_point(id) { return this.points.get(id); }

    get_section(id) { return this.sections.get(id); }

    split_section(section_id, p1, p2) { 
        console.log("p1", p1);
        console.log("p2", p2);

        // add the points to the point container
        this.points.cloud[p1.id] = p1;
        this.points.cloud[p2.id] = p2;

        const section = this.get_section(section_id);

        var all_points = Array.from(section.points);
        all_points.push(...[p1.id, p2.id]);
        all_points = all_points.sort(section.point_distance)

        var left_points = [], right_points = [], add_to_left = true;
        for( let i=0; i<all_points.length; ++i ) {
            const is_new_point = (all_points[i]===p1.id | all_points[i]===p2.id);
            if( add_to_left | is_new_point ) { left_points.push(all_points[i]); }
            if( !add_to_left | is_new_point ) { right_points.push(all_points[i]); }
            if( is_new_point ) { add_to_left = !add_to_left; }
        }

        
        console.log("left points", left_points);
        console.log("right points", right_points);

        // add the new sections to the tree
        const left_node = new Node(this.sections.add_section(left_points, this.get_point));
        const right_node = new Node(this.sections.add_section(right_points, this.get_point));
        this.nodes.get(section_id).left = left_node.id;
        this.nodes.get(section_id).right = right_node.id;

        // update the list of leaf nodes
        this.leaf_nodes = this.leaf_nodes.filter(e => e!==section_id);
        this.leaf_nodes.push(left_node.id);
        this.leaf_nodes.push(right_node.id);

        this.nodes.add(left_node);
        this.nodes.add(right_node);

        console.log("section-binary-tree.js", section_id, p1, p2);
    }
}

export default SectionBinaryTree;