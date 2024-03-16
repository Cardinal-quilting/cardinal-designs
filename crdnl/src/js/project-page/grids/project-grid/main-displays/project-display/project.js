import React, { Component } from "react";

import RecursivePiecing from "./recursive-piecing/recursive-piecing";

import BackgroundImage from "./background-image";

class Project extends Component {
    constructor(props) {
        super(props);

        this.state = { dragging: false }

        this.project_dimensions = this.project_dimensions.bind(this);
        this.handle_mouse_down = this.handle_mouse_down.bind(this);
        this.handle_mouse_up = this.handle_mouse_up.bind(this);
        this.mouse_enter = this.mouse_enter.bind(this);
        this.mouse_leave = this.mouse_leave.bind(this);
        this.mouse_move = this.mouse_move.bind(this);
        this.wheel = this.wheel.bind(this);
        this.transform_click_to_project_domain = this.transform_click_to_project_domain.bind(this);

        this.ref = React.createRef();
        this.recursive_piecing_ref = React.createRef();
    }

    static defaultProps = {
        display_scale_factor: 1.0,
        is_minimap: false
    }

    componentDidUpdate(prevProps, prevState) {
        if( !this.props.project_settings.background_image_disable_movement ) { 
            window.removeEventListener("wheel", this.wheel, {passive: false});
        }

        if( this.state.dragging && !prevState.dragging ) {
            document.addEventListener("mousemove", this.mouse_move);
        } else if( !this.state.dragging && prevState.dragging ) {
            document.removeEventListener("mousemove", this.mouse_move);
        }
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

        const display_scale_factor = this.props.is_minimap? this.props.display_scale_factor : this.props.project_settings.project_display_zoom;

        // in [0,1]x[0,1] the user clicks inside the project (could be <0 or >1 if they click on the main display but not in the project)
        return [(event.clientX - left)/(display_scale_factor*width),
                (event.clientY - top)/(display_scale_factor*height)];
    }

    disabled_recursive_piecing() {
        return this.props.is_minimap || !this.props.project_settings.background_image_disable_movement;
    }

    handle_mouse_down(event) {
        // the recursive piecing project might be moving a node
        var moving_node = false;
        if( this.recursive_piecing_ref.current!==null && !this.disabled_recursive_piecing() ) {
            const [clickX, clickY] = this.transform_click_to_project_domain(event); 
            moving_node = this.recursive_piecing_ref.current.handle_mouse_down(clickX, clickY);
        }

        this.setState({ 
            dragging: !moving_node && this.props.project_settings.background_image_disable_movement, // only drag the project if we are moving the node
            start_move: {
                current_translation_x: this.props.project_settings.project_display_translation.x,
                current_translation_y: this.props.project_settings.project_display_translation.y,
                screen_x: event.screenX,
                screen_y: event.screenY
            }
        });

        event.preventDefault();
        event.stopPropagation();
    }

    handle_mouse_up(event) {
        // handle mouse up of recursive piecing
        if( this.recursive_piecing_ref.current!==null && !this.disabled_recursive_piecing() ) {
            this.recursive_piecing_ref.current.handle_mouse_up();
        }

        const moved_x = Math.abs(this.props.project_settings.project_display_translation.x - this.state.start_move.current_translation_x),
              moved_y = Math.abs(this.props.project_settings.project_display_translation.y - this.state.start_move.current_translation_y);

        // we did not move the project, so deal with the fact that we clicked on it
        if( moved_x<1.0e-14 && moved_y<1.0e-14 && this.recursive_piecing_ref.current!==null && !this.disabled_recursive_piecing() ) {
            const [clickX, clickY] = this.transform_click_to_project_domain(event); 
            this.recursive_piecing_ref.current.handle_click(clickX, clickY);
        }

        this.setState({ 
            dragging: false,
            start_move: undefined
        });
    }

    mouse_move(event) {
        // the mouse is moving, but we are not dragging the project
        if( !this.state.dragging ) {
            return;
        }

        const xmove = event.screenX - this.state.start_move.screen_x,
              ymove = event.screenY - this.state.start_move.screen_y;

        this.props.project_settings.project_display_translation.x = this.state.start_move.current_translation_x + xmove;
        this.props.project_settings.project_display_translation.y = this.state.start_move.current_translation_y + ymove;

        this.props.set_project_settings(this.props.project_settings);

        event.preventDefault();
        event.stopPropagation();        
    }

    wheel(event) {
        const zoom = Math.max(0.0, this.props.project_settings.project_display_zoom + event.deltaY*this.props.project_settings.project_display_zoom_wheel_sensitivity);
        this.props.update_project_settings_element("project_display_zoom", zoom)

        event.preventDefault();
        event.stopPropagation();
    }

    mouse_enter() {
        if( this.props.is_minimap ) {
            return 
        }

        if( this.props.project_settings.background_image_disable_movement 
            && !this.props.project_settings.disable_project_display_movement) { 
            window.addEventListener("wheel", this.wheel, {passive: false});
        }
    }

    mouse_leave() {
        if( this.props.is_minimap ) {
            return 
        }

        if( this.props.project_settings.background_image_disable_movement 
            && !this.props.project_settings.disable_project_display_movement) { 
            window.removeEventListener("wheel", this.wheel);
        }
    }

    render() {
        const [height, width] = this.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        const zoom = this.props.is_minimap? this.props.display_scale_factor : this.props.project_settings.project_display_zoom,
              translate_x = this.props.is_minimap? 0.0 : this.props.project_settings.project_display_translation.x,
              translate_y = this.props.is_minimap? 0.0 : this.props.project_settings.project_display_translation.y;

        return ( 
            <div
            style={{
                justifyContent: "center", 
                alignItems: "center", 
                display: "grid",
                width: "100%",
                height: "100%",
            }}
            onMouseEnter={this.mouse_enter}
            onMouseLeave={this.mouse_leave}
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
            transform: `scale(${zoom}) translate(${translate_x}px, ${translate_y}px)`,
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