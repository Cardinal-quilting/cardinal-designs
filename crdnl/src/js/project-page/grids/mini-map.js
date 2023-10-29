import { Component } from "react";

import Project from "../projects/project";

import "css/project-page/grids/mini-map.css"

class MiniMap extends Component {
    render() {
        return (
            <div className="mini-map"
            style={{
                minWidth: this.props.width, 
                maxWidth: this.props.width,
                minHeight: this.props.height, 
                maxHeight: this.props.height,
                backgroundColor: this.props.settings.project_display_background_color
            }}
            >
                <Project display_scale_factor={this.props.project_display_factor} />
            </div>
        );
    }
}

export default MiniMap;