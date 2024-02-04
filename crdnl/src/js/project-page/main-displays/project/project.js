import React, { Component } from "react";

import RecursivePiecing from "./recursive-piecing/recursive-piecing";

import BackgroundImage from "./background-image";

class Project extends Component {
    constructor(props) {
        super(props);

        this.project_dimensions = this.project_dimensions.bind(this);
        this.handle_mouse_down = this.handle_mouse_down.bind(this);
        this.handle_mouse_up = this.handle_mouse_up.bind(this);
        this.transform_click_to_project_domain = this.transform_click_to_project_domain.bind(this);

        this.ref = React.createRef();
        this.recursive_piecing_ref = React.createRef();
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

    transform_click_to_project_domain(event) {
        const [height, width] = this.project_dimensions();
        const { left, top } = this.ref.current.getBoundingClientRect();

        // in [0,1]x[0,1] the user clicks inside the project (could be <0 or >1 if they click on the main display but not in the project)
        return [(event.clientX-left)/(this.props.display_scale_factor*width),
                (event.clientY-top)/(this.props.display_scale_factor*height)];
    }

    disabled_recursive_piecing() {
        return this.props.is_minimap || !this.props.project_settings.background_image_disable_movement;
    }

    handle_mouse_down(event) {
        if( this.recursive_piecing_ref.current!==null && !this.disabled_recursive_piecing() ) {
            const [clickX, clickY] = this.transform_click_to_project_domain(event); 
            this.recursive_piecing_ref.current.handle_mouse_down(clickX, clickY);
        }
    }

    handle_mouse_up() {
        if( this.recursive_piecing_ref.current!==null && !this.disabled_recursive_piecing() ) {
            this.recursive_piecing_ref.current.handle_mouse_up();
        }
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
                width: "100%",
                height: "100%",
            }}
            onMouseDown={this.handle_mouse_down}
            onMouseUp={this.handle_mouse_up}
            >
            <div
            ref={this.ref}
            style={{     
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

        {this.props.project_settings.has_recursive_piecing?
        <RecursivePiecing
            ref={this.recursive_piecing_ref}
            project_dimensions = {this.project_dimensions}
            recursive_piecing_settings={this.props.recursive_piecing_settings}
            recursive_piecing_nodes={this.props.recursive_piecing_nodes}
            recursive_piecing_lines={this.props.recursive_piecing_lines}
            recursive_piecing_panels={this.props.recursive_piecing_panels}
            update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
            disabled={this.disabled_recursive_piecing()}
            transform_click_to_project_domain = {this.transform_click_to_project_domain}
        /> : null }
        </div>
        </div>
        );
    }
}

export default Project;