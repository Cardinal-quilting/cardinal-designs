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