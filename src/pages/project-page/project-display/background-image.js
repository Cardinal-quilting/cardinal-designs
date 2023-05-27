import { Component } from "react";

import "styles/pages/project-page/project-display/background-image.css";

class BackgroundImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: this.props.parent_height
        }

        this.wheel = this.wheel.bind(this);
        this.mouse_enter = this.mouse_enter.bind(this);
        this.mouse_leave = this.mouse_leave.bind(this);
    }

    static defaultProps = {
        wheel_scale: 0.05,
        parent_height: 100,
        parent_width: 1,
    }

    wheel(event) {
        this.setState({
            height: Math.max(0.0, this.state.height + event.deltaY*this.props.wheel_scale)
        })

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
        const height = this.state.height.toString()+"vh"
        const width = this.props.parent_width.toString()+"vw"

        return (
            <div
                onMouseEnter={this.mouse_enter}
                onMouseLeave={this.mouse_leave}
                style={{
                    minHeight: height,
                    maxHeight: height,
                    height: height,
                    width: width,
                    display: "flex",
                    position: "absolute",                    
                    justifyContent: "center", 
                    overflow: "hidden"
                }}
            >

            <img 
                
                src={require("/Users/andrewdavis/Cardinal-designs/cardinal-designs/src/figures/logos/CardinalQuiltsLogo.png")}
                alt="background" 
                className="background-image"
                
                style={{
                    padding: "0vh 0vw "+(this.state.height/2).toString()+"vh 0vw", // top, right, bottom, left
                    position: "absolute",
                    opacity: 0.5,
                    minHeight: height,
                    maxHeight: height,
                    overflow: "hidden"    
                }}                    
            />      
            </div>  
        );
    }
}

export default BackgroundImage;