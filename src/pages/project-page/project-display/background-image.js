import { Component } from "react";

import "styles/pages/project-page/project-display/background-image.css";

class BackgroundImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dragging:false,
        }

        this.wheel = this.wheel.bind(this);
        this.mouse_enter = this.mouse_enter.bind(this);
        this.mouse_leave = this.mouse_leave.bind(this);
        this.mouse_down = this.mouse_down.bind(this);
        this.mouse_move = this.mouse_move.bind(this);
        this.mouse_up = this.mouse_up.bind(this);
    }

    static defaultProps = {
        wheel_scale: 0.001
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

    mouse_move(event) {
        var xmove = event.screenX - this.state.start_move.x;
        var ymove = event.screenY - this.state.start_move.y;

        this.props.background_image.pos = {
            x: this.state.start_move.pos.x - xmove,
            y: this.state.start_move.pos.y - ymove
        }

        this.props.update_background_image(this.props.background_image);

        event.preventDefault();
        event.stopPropagation();
    }

    mouse_up(event) {
        this.setState({
            dragging: false,
            start_move: null
        });

        event.preventDefault();
        event.stopPropagation();
    }

    wheel(event) {
        this.props.background_image.zoom_scale = this.props.background_image.zoom_scale + event.deltaY*this.props.wheel_scale;
        this.props.background_image.zoom_scale = Math.max(0.0, this.props.background_image.zoom_scale);
        this.props.background_image.zoom_scale = Math.min(this.props.background_image.max_zoom_scale, this.props.background_image.zoom_scale);
        this.props.update_background_image(this.props.background_image);

        event.preventDefault();
        event.stopPropagation();
    }

    mouse_enter() {
        if( !this.props.enabled ) { return; }
        window.addEventListener("wheel", this.wheel, {passive: false});
    }

    mouse_leave() {
        if( !this.props.enabled ) { return; }
        window.removeEventListener("wheel", this.wheel);
    }

    mouse_down(event) {
        // only left mouse
        if( event.button!==0 | !this.props.enabled ) { return; }

        this.setState({
            dragging: true,
            start_move: {
                pos: this.props.background_image.pos,
                x: event.screenX,
                y: event.screenY
            }
        });

        event.stopPropagation();
        event.preventDefault();
    }

    render() {
        var [, parent_width, height, width] = this.props.get_project_dimensions();

        const parent_height = (height*parent_width).toString()+"px";

        height = (this.props.background_image.zoom_scale*height*parent_width).toString()+"px";
        width = (width*parent_width).toString()+"px";

        parent_width = parent_width.toString()+"px";

        return (
            <div
                onMouseEnter={this.mouse_enter}
                onMouseLeave={this.mouse_leave}
                onMouseDown={this.mouse_down}
                style={{
                    paddingBottom: Math.max(0, this.props.background_image.pos.y).toString()+"px",
                    paddingTop: Math.abs(Math.min(0, this.props.background_image.pos.y)).toString()+"px",
                    paddingRight: Math.max(0, this.props.background_image.pos.x).toString()+"px",
                    paddingLeft: Math.abs(Math.min(0, this.props.background_image.pos.x)).toString()+"px",
                    minHeight: parent_height,
                    maxHeight: parent_height,
                    minWidth: width,
                    maxWidth: width,
                    height: parent_height,
                    width: width,
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center", 
                    alignItems: "center",
                }}
            >

            <img 
                src={this.props.background_image.file}
                alt="background" 
                className="background-image"
                
                style={{
                    padding: "0vh 0vw 0vh 0vw", // top, right, bottom, left
                    position: "absolute",
                    opacity: this.props.background_image.opacity,                    
                    minHeight: height,
                    maxHeight: height,
                    overflowX: "hidden",
                    overflowY: "hidden"    
                }}                    
            /> 
            
            </div>  
        );
    }
}

export default BackgroundImage;