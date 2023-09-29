import DisplayState from "projects/display-state/display-state";
import SectionBinaryTree from "projects/geometry/section-binary-tree";

/**
 * A Cardinal Designs project.
 */
class Project {
    constructor(data) {
        this.metadata = data.metadata;
        this.project_geometry = new SectionBinaryTree();
        this.display_state = data.display_state? data.display_state : new DisplayState();
    }

    stringify() { return JSON.stringify(this); }
}

export default Project;