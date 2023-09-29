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

    split_section(section_id, point1, point2) {
        this.props.project_geometry.split_section(section_id, point1, point2);
        this.props.update_project_geometry();
    }

    render() {
        if( !this.state.mounted ) { return <div></div>; }
        const [parent_height, parent_width, height, width] = this.props.get_project_dimensions();

        const height_percent = (100*height).toString()+"%";
        const width_percent = (100*width).toString()+"%"; 

        console.log("recursive-piece", this.props.project_geometry.leaf_nodes[0]); 
        console.log("recursive-piecing", this.props.project_geometry.get_section(this.props.project_geometry.leaf_nodes[0]))

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
                    section={this.props.project_geometry.leaf_nodes[0]}
                    get_point={this.props.project_geometry.get_point}
                    get_section={this.props.project_geometry.get_section}
                    grid_mode={this.props.grid_mode}
                    swap_grid_mode={(new_grid_mode) => this.props.swap_grid_mode(new_grid_mode)}
                    split_section={(section_id, point1, point2) => this.split_section(section_id, point1, point2)}
                >
                </NodeChain>
                
            </div>
        );
    }
}

export default RecursivePiecing;