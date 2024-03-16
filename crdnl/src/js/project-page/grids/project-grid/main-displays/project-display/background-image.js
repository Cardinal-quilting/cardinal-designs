import { Component } from "react";

import logo from "logos/CardinalQuiltsSmallLogo.png"

class BackgroundImage extends Component {
    constructor(props) {
        super(props);

        this.state = { dragging: false }

        this.mouse_enter = this.mouse_enter.bind(this);
        this.mouse_leave = this.mouse_leave.bind(this);
        this.wheel = this.wheel.bind(this);

        this.mouse_down = this.mouse_down.bind(this);
        this.mouse_up = this.mouse_up.bind(this);
        this.mouse_move = this.mouse_move.bind(this);
    }

    wheel(event) {
        this.props.project_settings.background_image_zoom = Math.max(0.0, this.props.project_settings.background_image_zoom + event.deltaY*this.props.project_settings.background_image_wheel_sensitivity);
        this.props.set_project_settings(this.props.project_settings);

        event.preventDefault();
        event.stopPropagation();
    }

    mouse_enter() {
        if( this.props.is_minimap | this.props.project_settings.background_image_disable_movement ) { return; }
        window.addEventListener("wheel", this.wheel, {passive: false});
    }

    mouse_leave() {
        if( this.props.is_minimap | this.props.project_settings.background_image_disable_movement ) { return; }
        window.removeEventListener("wheel", this.wheel);
    }

    componentDidUpdate(prevProps, prevState) {
        if( this.state.dragging && !prevState.dragging ) {
            document.addEventListener("mousemove", this.mouse_move);
            document.addEventListener("mouseup", this.mouse_up);
        } else if( !this.state.dragging && prevState.dragging ) {
            document.removeEventListener("mousemove", this.mouse_move);
            document.removeEventListener("mouseup", this.mouse_up);
        }
    }

    mouse_up(event) {
        this.setState({ 
            dragging: false,
            start_move: undefined
        });
    }

    mouse_move(event) {
        const [height, width] = this.props.project_dimensions();

        var xmove = event.screenX - this.state.start_move.screen_x;
        var ymove = event.screenY - this.state.start_move.screen_y;

        this.props.project_settings.background_image_translation.x = this.state.start_move.image_x + xmove/width;
        this.props.project_settings.background_image_translation.y = this.state.start_move.image_y + ymove/height;

        this.props.set_project_settings(this.props.project_settings);
    }

    mouse_down(event) {
        // only left mouse
        if( event.button!==0 ) { return; }
        if( this.props.is_minimap | this.props.project_settings.background_image_disable_movement ) { return; }

        this.setState({ 
            dragging: true,
            start_move: {
                image_x: this.props.project_settings.background_image_translation.x,
                image_y: this.props.project_settings.background_image_translation.y,
                screen_x: event.screenX,
                screen_y: event.screenY
            }
        });
    }

    render() { 
        const [height, width] = this.props.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        // If the aspect ratio is <1.0, translate the image so that it is centered when the background_image_translation parameter is (0, 0).
        // This means that the default behavior ((0, 0) tranlation and 1.0 zoom) means the background image matches the height exactly and is centered.
        // Altnatively, we could set the height of the image to min(height, width) so that the default is that it fits exactly in the project.
        const image_translation = -50*Math.max(0.0, 1.0-this.props.project_settings.aspect_ratio);

        return (
            <div
                onMouseEnter={this.mouse_enter}
                onMouseLeave={this.mouse_leave}
                onMouseDown={this.mouse_down}                
                style={{                    
                    transform: `translate(${width*this.props.project_settings.background_image_translation.x}px, ${height*this.props.project_settings.background_image_translation.y}px) scale(${this.props.project_settings.background_image_zoom})`, 
                    height: height_px,
                    width: width_px,
                    position: "absolute"
                }}
            >
                <img src={logo} className="logo" alt="logo"
                style={{
                    transform: `translate(${image_translation}%, 0%)`,
                    opacity: this.props.project_settings.background_image_opacity,
                    height: height_px
            }}/>
            </div>
        );
    }
}

export default BackgroundImage;