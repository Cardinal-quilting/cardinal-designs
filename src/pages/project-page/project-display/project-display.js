import React, { Component } from "react";

import RecursivePiecing from 'pages/project-page/project-display/recursive-piecing';

import "styles/pages/project-page/project-display/project-display.css";

/**
 * @prop {string} props.height=90 - The height of the project display window (measured in <tt>vh</tt> units)
 * @prop {string} props.width=80 - The width of the project display window (measured in <tt>vw</tt> units)
 * @prop {bool} props.enabled=true - Is the functionality of this componenent enabled?
 */
class ProjectDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mounted: false,
            window_size: {
                height: window.innerWidth,
                width: window.innerWidth,
            }
        }

        this.ref = React.createRef();
    }

    static defaultProps = {
        height: 90,
        width: 80,
        enabled: true,
        zIndex: 0
    }

    update_dimensions = () => {
        this.setState({window_size: {
            height: window.innerWidth,
            width: window.innerWidth,
        }});
    }

    componentDidMount() {
        window.addEventListener("resize", this.update_dimensions);
        this.setState({mounted: true});
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.update_dimensions);
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
                    zIndex: this.props.zIndex,
                    minHeight: height,
                    maxHeight: height,
                    minWidth: width,
                    maxWidth: width,
                }}
            >
            
            {this.state.mounted? <RecursivePiecing
                parent_height = {this.props.height}
                parent_width = {this.props.width}
                parent_ref = {this.ref}
                project = {this.props.project}
            >
            </RecursivePiecing> : null}

            </div>
        );
    }
}

export default ProjectDisplay;