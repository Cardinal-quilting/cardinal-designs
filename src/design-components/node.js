import React, { Component } from 'react';

import './../styles/design-components/node.css';

/**
 * A <tt>node</tt> is a key point in the design.
 * 
 * @prop {string} props.display_width - The width of the display window containing the project (measured in <tt>vw</tt> units)
 * @prop {string} props.display_height - The height of the display window containing the project (measured in <tt>vh</tt> units)
 * @prop {string} props.size_width="1" - The width of the bounding box containing the node (measured in <tt>vmin</tt> units)
 * @prop {string} props.size_height="1" - The height of the bounding box containing the node (measured in <tt>vmin</tt> units)
 * @prop {float} state.xpos=0.5 - The x position of the node, with 0 being the left side and 1 being the right side
 * @prop {float} state.ypos=0.5 - The y position of the node, with 0 being the bottom and 1 being the top
 */
class Node extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xpos: 0.5,
            ypos: 0.5
        }
    }

    /**
     * The default props 
     */ 
    static defaultProps = {
        size: 1,
    }

    render() {
        // the position of the node in display coordinates
        const xpos = (this.state.xpos*this.props.display_width).toString()+"vw";
        const ypos = ((1.0-this.state.ypos)*this.props.display_height).toString()+"vh";

        // the size of the node and the margin in display coordinates; the margin shifts the node the position reflects the center 
        const size = this.props.size.toString()+"vmin";
        const margin = (-this.props.size/2).toString()+"vmin";
        
        return (
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
        );
    }
}

export default Node;