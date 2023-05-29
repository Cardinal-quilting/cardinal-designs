import { Component } from "react";

import "styles/pages/project-page/project-display/background-image.css";

class BackgroundImage extends Component {
    constructor(props) {
        super(props);

        this.wheel = this.wheel.bind(this);
        this.mouse_enter = this.mouse_enter.bind(this);
        this.mouse_leave = this.mouse_leave.bind(this);
    }

    static defaultProps = {
        wheel_scale: 0.001
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
        window.addEventListener("wheel", this.wheel, {passive: false});
    }

    mouse_leave() {
        window.removeEventListener("wheel", this.wheel);
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
                style={{
                    minHeight: parent_height,
                    maxHeight: parent_height,
                    minWidth: width,
                    maxWidth: width,
                    height: parent_height,
                    width: parent_width,
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center", 
                    alignItems: "center",
                    margin: 0,
                    overflow: "hidden",
                    zIndex: 0
                }}
            >

            <img 
                src={require("/Users/andrewdavis/Cardinal-designs/cardinal-designs/src/figures/logos/CardinalQuiltsLogo.png")}
                alt="background" 
                className="background-image"
                
                style={{
                    padding: "0vh 0vw 0vh 0vw", // top, right, bottom, left
                    position: "absolute",
                    opacity: 0.5,                    
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