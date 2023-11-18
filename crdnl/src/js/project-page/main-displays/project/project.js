import { Component } from "react";

import logo from "logos/CardinalQuiltsSmallLogo.png"

class Project extends Component {
    static defaultProps = {
        display_scale_factor: 1.0,
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

            <img src={logo} className="logo" alt="logo"
                style={{
                    position: "abolute",
                    transform: `translate(${0}px, 0%) scale(${this.props.project_settings.background_image_zoom})`,                
                    height: height_px
            }}/>
        </div>
        );
    }
}

export default Project;