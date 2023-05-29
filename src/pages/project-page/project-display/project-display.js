import React, { Component } from "react";

import RecursivePiecing from 'pages/project-page/project-display/recursive-piecing';
import BackgroundImage from 'pages/project-page/project-display/background-image';

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
        this.project_dimensions = this.project_dimensions.bind(this);
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

    project_dimensions() {
        const parent_width = this.ref.current.getBoundingClientRect().width;
        const parent_height = this.ref.current.getBoundingClientRect().height;
                
        const max_width = 0.99;
        const max_height = max_width*parent_height/parent_width;

        const height = max_width/this.props.project.metadata.aspect_ratio;
        if( height<=max_height ) {
            return [parent_height, parent_width, height, max_width];
        }
        return [parent_height, parent_width, max_height, max_height*this.props.project.metadata.aspect_ratio];
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
                    enabled: this.props.enabled,
                    zIndex: this.props.zIndices.min,
                    minHeight: height,
                    maxHeight: height,
                    height: height,
                    minWidth: width,
                    maxWidth: width,
                    width: width
                }}
            >
                
            {this.state.mounted? <RecursivePiecing
                component_z_index={this.props.zIndices.max}
                enabled={this.props.enabled}
                parent_height={this.props.height}
                parent_width={this.props.width}
                parent_ref={this.ref}
                project={this.props.project}
                get_project_dimensions={this.project_dimensions}
            >
            </RecursivePiecing> : null}

            {(this.props.background_image.display_image & this.state.mounted)? <BackgroundImage
                get_project_dimensions={this.project_dimensions}
                parent_height={this.props.height}
                parent_width={this.props.width}
                background_image={this.props.background_image}
                update_background_image={this.props.update_background_image}
            /> : null}
            </div>

        );
    }
}

export default ProjectDisplay;