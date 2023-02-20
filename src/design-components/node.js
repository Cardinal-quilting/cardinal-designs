import React, { Component } from 'react';

import Draggable from './../user-interface/draggable';

import './../styles/design-components/node.css';

/**
 * A <tt>node</tt> is a key point in the design.
 * 
 * @prop {string} props.display.width - The width of the display window containing the project (measured in <tt>vw</tt> units)
 * @prop {string} props.display.height - The height of the display window containing the project (measured in <tt>vh</tt> units)
 * @prop {string} props.size="1" - The width/height of the bounding box containing the node (measured in <tt>vmin</tt> units)
 * @prop {float} state.pos.x=0.5 - The x position of the node, with 0 being the left side and 1 being the right side
 * @prop {float} state.pos.x=0.5 - The y position of the node, with 0 being the bottom and 1 being the top
 * @prop {function} props.get_display_info - Get information about the project display window
 */
class Node extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pos: {
                x: 0.5,
                y: 0.5
            }
        }
    }

    /**
     * The default props 
     */ 
    static defaultProps = {
        size: 1,
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

    render() {
        // the position of the node in display coordinates
        const xpos = (this.state.pos.x*this.props.display.width).toString()+"vw";
        const ypos = ((1.0-this.state.pos.y)*this.props.display.height).toString()+"vh";

        // the size of the node and the margin in display coordinates; the margin shifts the node the position reflects the center 
        const size = this.props.size.toString()+"vmin";
        const margin = (-this.props.size/2).toString()+"vmin";
        
        return (
            <Draggable
                pos={this.state.pos}
                get_display_info = {this.props.get_display_info}
                set_position = {(x, y) => this.set_position(x, y)}
            >
                <div 
                    className="node"
                    style={{
                        marginTop: margin,
                        marginLeft: margin,
                        width: size,
                        height: size,
                        left: xpos,
                        top: ypos
                    }}
                />
            </Draggable>
        );
    }
}

export default Node;