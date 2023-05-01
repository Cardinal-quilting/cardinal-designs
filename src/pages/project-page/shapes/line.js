import React, { Component } from 'react';

import 'styles/pages/project-page/shapes/line.css';

class Line extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current_color: this.props.color,
        }

        this.mouse_enter = this.mouse_enter.bind(this);
        this.mouse_leave = this.mouse_leave.bind(this);
        this.mouse_click = this.mouse_click.bind(this);
    } 
    
    static defaultProps = {
        color: "--black-theme",
        mouseover_color: "--red-theme"
    }

    mouse_enter() {
        this.setState({
            current_color: this.props.mouseover_color 
         });
    }

    mouse_leave() {
        this.setState({
            current_color: this.props.color 
         });
    }

    mouse_click(event) {
        // get the end points of the line in pixel cordinates
        const display_info = this.props.get_display_info();
        const x1 = display_info.width*this.props.point1.position.x + display_info.left
        const y1 = display_info.bottom - display_info.height*this.props.point1.position.y;
        const x2 = display_info.width*this.props.point2.position.x + display_info.left
        const y2 = display_info.bottom - display_info.height*this.props.point2.position.y;

        // a vector that points along the line
        const v1 = x2 - x1;
        const v2 = y2 - y1;

        // the location where we clicked
        const xe = event.clientX - x1;
        const ye = event.clientY - y1;

        // scale*[v1, v2] + [x1, y1] is the location on the line where we clicked in pixel space
        const scale = (v1*xe + v2*ye)/(v1*v1 + v2*v2)
        
        // the coordinate relative to the parent
        const x = scale*(this.props.point2.position.x-this.props.point1.position.x) + this.props.point1.position.x;
        const y = scale*(this.props.point2.position.y-this.props.point1.position.y) + this.props.point1.position.y;
        
        console.log("CLICKED POINT:", x, y)
    }

    render() {
        const x1 = this.props.point1.position.x
        const y1 = this.props.point1.position.y
        const x2 = this.props.point2.position.x
        const y2 = this.props.point2.position.y
        
        const x1pos = (x1*this.props.display.parent_width).toString()+"vw";
        const y1pos = ((1-y1)*this.props.display.parent_height).toString()+"vh";

        const xdiff = x1-x2;
        const ydiff = (y2-y1)/this.props.aspect_ratio;

        const angle = Math.abs(xdiff)<1.0e-14? (ydiff>0.0? -Math.PI/2.0 : Math.PI/2.0) : (Math.atan(ydiff/xdiff) + (xdiff>0? Math.PI : 0.0));
        const width = (Math.sqrt(xdiff*xdiff + ydiff*ydiff)*this.props.display.parent_width).toString()+"vw";

        const margin = (-0.25).toString()+"vmin";

        return (
            <div
                onMouseEnter={this.mouse_enter}
                onMouseLeave={this.mouse_leave}
                onClick={this.mouse_click}
                className="line"
                style={{
                    marginTop: margin,
                    marginBottom: margin,
                    width: width,
                    borderBottom: "0.5vmin solid",
                    color: getComputedStyle(document.documentElement).getPropertyValue(this.state.current_color),
                    transform: "rotate("+ angle.toString() +"rad)", 
                    left: x1pos,
                    top: y1pos
                }}
                
            >
            </div>
        );
    }
}

export default Line;