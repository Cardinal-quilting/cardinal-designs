import React, { Component } from 'react';

import Node from '../design-components/node';

import './../styles/user-interface/project-display.css';

/**
 * @prop {string} props.height=90 - The height of the project display window (measured in <tt>vh</tt> units)
 * @prop {string} props.width=80 - The width of the project display window (measured in <tt>vw</tt> units)
 */
class ProjectDisplay extends Component {
    static defaultProps = {
        height: 90,
        width: 80
    }

    render() {
        // the width/height of the display window with units
        const width = this.props.width.toString()+"vw";
        const height = this.props.height.toString()+"vh";
        
        return (
            <div 
                className="project-display"
                style={{
                    minHeight: height,
                    maxHeight: height,
                    minWidth: width,
                    maxWidth: width
                }}
            >
                <Node 
                    display_width={this.props.width} 
                    display_height={this.props.height}
                />
            </div>
        );
    }
}

export default ProjectDisplay;