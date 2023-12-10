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

        event.preventDefault();
        event.stopPropagation();   
    }

    mouse_move(event) {
        const [height, width] = this.props.project_dimensions();

        var xmove = event.screenX - this.state.start_move.screen_x;
        var ymove = event.screenY - this.state.start_move.screen_y;

        this.props.project_settings.background_image_translation.x = this.state.start_move.image_x + 100.0*xmove/window.innerWidth/width;
        this.props.project_settings.background_image_translation.y = this.state.start_move.image_y + 100.0*ymove/window.innerHeight/height;

        this.props.set_project_settings(this.props.project_settings);

        event.preventDefault();
        event.stopPropagation();        
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

        event.preventDefault();
        event.stopPropagation();
    }

    render() { 
        const [height, width] = this.props.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        return (
            <div
                onMouseEnter={this.mouse_enter}
                onMouseLeave={this.mouse_leave}
                onMouseDown={this.mouse_down}                
                style={{                    
                    transform: `translate(${width*this.props.project_settings.background_image_translation.x}vw, ${height*this.props.project_settings.background_image_translation.y}vh) scale(${this.props.project_settings.background_image_zoom})`, 
                    height: height_px,
                    width: width_px
                }}
            >
                <img src={logo} className="logo" alt="logo"
                style={{
                    opacity: this.props.project_settings.background_image_opacity,
                    height: height_px
            }}/>
            </div>
        );
    }
}

export default BackgroundImage;