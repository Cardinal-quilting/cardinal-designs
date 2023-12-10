import { Component } from "react";

import RecursivePiecing from "./recursive-piecing";

import BackgroundImage from "./background-image";

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

        const max_width = 1.0;
        const max_height = max_width*parent_height/parent_width;

        const height = max_width/this.props.project_settings.aspect_ratio;
        if( height<=max_height ) {
            return [parent_width*height, parent_width*max_width];
        }
        return [parent_width*max_height, parent_width*max_height*this.props.project_settings.aspect_ratio];
    }

    render() {
        const [parent_height, parent_width] = this.props.display_dimensions();
        const parent_height_px = String(parent_height) + "px", parent_width_px = String(parent_width) + "px";

        const [height, width] = this.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        return ( 
            <div
            style={{
                justifyContent: "center", 
                alignItems: "center", 
                display: "flex",
                position: "relative",
                minWidth: parent_width_px, 
                maxWidth: parent_width_px,
                minHeight: parent_height_px, 
                maxHeight: parent_height_px,
                transform: `scale(${this.props.display_scale_factor})`,
            }}
            >
                <div
        style={{     
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: "0.5vmin",
            minWidth: width_px, 
            maxWidth: width_px,
            minHeight: height_px, 
            maxHeight: height_px,
        }}
        >

        {<RecursivePiecing
            project_dimensions = {this.project_dimensions}
        />}

        {this.props.project_settings.background_image_display? 
        <BackgroundImage
            project_dimensions = {this.project_dimensions}
            project_settings = {this.props.project_settings}
            set_project_settings={this.props.set_project_settings}
            is_minimap = {this.props.is_minimap}
        /> : null }
        </div>
        </div>
        );
    }
}

export default Project;