import React, { Component } from 'react';

import Node from '../design-components/node';

import './../styles/user-interface/project-display.css';

/**
 * @prop {string} props.height=90 - The height of the project display window (measured in <tt>vh</tt> units)
 * @prop {string} props.width=80 - The width of the project display window (measured in <tt>vw</tt> units)
 */
class ProjectDisplay extends Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    static defaultProps = {
        height: 90,
        width: 80
    }

    get_display_info() {
        return this.ref.current.getBoundingClientRect();
    }

    render() {
        // the width/height of the display window with units
        const width = this.props.width.toString()+"vw";
        const height = this.props.height.toString()+"vh";
        
        return (
            <div 
                className="project-display"
                ref = {this.ref}
                style={{
                    minHeight: height,
                    maxHeight: height,
                    minWidth: width,
                    maxWidth: width
                }}
            >
                <Node 
                    get_display_info = {() => this.get_display_info()}
                    display={{
                        width: this.props.width,
                        height: this.props.height
                    }}
                />
            </div>
        );
    }
}

export default ProjectDisplay;