import React, { Component } from "react";

import NodeChain from "pages/project-page/shapes/node-chain";

import "styles/pages/project-page/project-display/recursive-piecing.css";

/**
 * @prop {string} props.height=90 - The height of the project display (measured in <tt>vh</tt> units)
 * @prop {string} props.width=80 - The width of the project display (measured in <tt>vw</tt> units)
 */
class RecursivePiecing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mounted: false
        }

        this.ref = React.createRef();
    }

    componentDidMount() {
        this.setState({mounted: true});
    }

    get_display_info() { 
        return this.ref.current.getBoundingClientRect(); 
    }

    render() {
        if( !this.state.mounted ) { return <div></div>; }
        const [parent_height, parent_width, height, width] = this.props.get_project_dimensions();

        const height_percent = (100*height).toString()+"%";
        const width_percent = (100*width).toString()+"%"; 

        return (
            <div
                className="recursive-display-body"
                ref={this.ref}
                style={{
                    paddingBottom: height_percent,
                    paddingRight: width_percent,
                }}
            >
                <NodeChain
                    enabled={this.props.enabled}
                    moveable={this.props.enabled}
                    z_index={this.props.component_z_index}
                    get_display_info = {() => this.get_display_info()}
                    display={{
                        parent_width: width*this.props.parent_width,
                        parent_height: height*parent_width/parent_height*this.props.parent_height
                    }}                    
                    aspect_ratio={this.props.project_metadata.aspect_ratio}
                    points={this.props.project_geometry.whole_project.points}
                    access_point={this.props.project_geometry.access_point}
                >
                </NodeChain>
                
            </div>
        );
    }
}

export default RecursivePiecing;