import { Component } from "react";

import Project from "../projects/project";

import "css/project-page/grids/project-display.css"

class ProjectDisplay extends Component {
    render() {
        return (
            <div className="project-display"
            style={{ 
                minWidth: this.props.width, 
                maxWidth: this.props.width,
                minHeight: this.props.height, 
                maxHeight: this.props.height,
                backgroundColor: this.props.settings.project_display_background_color
            }}
            >
            <Project />
            </div>
        );
    }
}

export default ProjectDisplay;