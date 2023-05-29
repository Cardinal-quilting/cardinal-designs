import React, { Component } from "react";

import Draggable from "infrastructure/draggable";

import "styles/pages/project-page/shapes/node.css";

/**
 * A <tt>node</tt> is a key point in the design.
 * 
 * @prop {string} props.display.width - The width of the display window containing the project (measured in <tt>vw</tt> units)
 * @prop {string} props.display.height - The height of the display window containing the project (measured in <tt>vh</tt> units)
 * @prop {string} props.size="1" - The width/height of the bounding box containing the node (measured in <tt>vmin</tt> units)
 * @prop {bool} props.draggable=true - Is this object draggable?
 * @prop {float} state.pos.x=0.5 - The x position of the node, with 0 being the left side and 1 being the right side
 * @prop {float} state.pos.x=0.5 - The y position of the node, with 0 being the bottom and 1 being the top
 * @prop {function} props.get_display_info - Get information about the project display window
 */
class Node extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current_color: this.props.color,
            pos: {
                x: this.props.initial_pos.x,
                y: this.props.initial_pos.y
            }
        }

        this.mouse_enter = this.mouse_enter.bind(this);
        this.mouse_leave = this.mouse_leave.bind(this);
    }

    /**
     * The default props 
     */ 
    static defaultProps = {
        enabled: true,
        color: "--black-theme",
        mouseover_color: "--red-theme",
        size: 1,
        draggable: true,
        initial_pos: {
            x: 0.5,
            y: 0.5
        }
    }

    /**
     * Reset the position of the node.
     * @param {float} x The x position
     * @param {float} y The y position
     */
    set_position(x, y) {
        this.setState({
            pos: {
                x: x,
                y: y
            }
        });
    }

    mouse_enter() {
        if( !this.props.enabled ) { return; }

        this.setState({
            current_color: this.props.mouseover_color 
         });
    }

    mouse_leave() {
        if( !this.props.enabled ) { return; }

        this.setState({
            current_color: this.props.color 
         });
    }

    render() {        
        // the position of the node in display coordinates
        const xpos = (this.state.pos.x*this.props.display.parent_width).toString()+"vw";
        const ypos = ((1-this.state.pos.y)*this.props.display.parent_height).toString()+"vh";
        
        // the size of the node and the margin in display coordinates; the margin shifts the node the position reflects the center 
        const size = this.props.size.toString()+"vmin";
        const margin = (-this.props.size/2).toString()+"vmin";
        
        return (
           <Draggable
                pos={this.state.pos}
                get_display_info = {this.props.get_display_info}
                set_position = {(x, y) => this.set_position(x, y)}
                enabled = {this.props.enabled & this.props.draggable}
            >
                <div 
                    onMouseEnter={this.mouse_enter}
                    onMouseLeave={this.mouse_leave}
                    className="node"
                    style={{
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(this.state.current_color),
                        marginTop: margin,
                        marginBottom: margin,
                        marginLeft: margin,
                        marginRight: margin,
                        width: size,
                        height: size,
                        left: xpos,
                        top: ypos,
                        zIndex: this.props.z_index
                    }}
                />
            </Draggable>
        );
    }
}

export default Node;