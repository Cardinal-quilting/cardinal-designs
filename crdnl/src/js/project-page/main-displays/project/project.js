import { Component } from "react";

import BackgroundImage from "../background-image";

class Project extends Component {
    constructor(props) {
        super(props);

        this.project_dimensions = this.project_dimensions.bind(this);
    }

    static defaultProps = {
        display_scale_factor: 1.0,
        is_minimap: false
    }

    project_dimensions() {
        const [parent_height, parent_width] = this.props.display_dimensions();

        const max_width = 0.99;
        const max_height = max_width*parent_height/parent_width;

        const height = max_width/this.props.project_info.aspect_ratio;
        if( height<=max_height ) {
            return [parent_width*height/this.props.display_scale_factor, parent_width*max_width/this.props.display_scale_factor];
        }
        return [parent_width*max_height/this.props.display_scale_factor, parent_width*max_height*this.props.project_info.aspect_ratio/this.props.display_scale_factor];
    }

    render() {
        const [height, width] = this.project_dimensions();

        const height_px = String(height) + "px", width_px = String(width) + "px";

        return ( 
        <div
        style={{     
            justifyContent: "center", 
            alignItems: "center", 
            display: "grid",
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: "0.5vmin",
            minWidth: width_px, 
            maxWidth: width_px,
            minHeight: height_px, 
            maxHeight: height_px,
            transform: `scale(${this.props.display_scale_factor})`,
        }}
        >

        {this.props.project_settings.background_image_display? 
        <BackgroundImage
            project_dimensions = {this.project_dimensions}
            project_settings = {this.props.project_settings}
            set_project_settings={this.props.set_project_settings}
            is_minimap = {this.props.is_minimap}
        /> : null }
        </div>
        );
    }
}

export default Project;