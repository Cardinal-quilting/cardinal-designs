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

    project_dimensions() {
        const parent_width = this.props.parent_ref.current.getBoundingClientRect().width;
        const parent_height = this.props.parent_ref.current.getBoundingClientRect().height;
                
        const max_width = 0.99;
        const max_height = max_width*parent_height/parent_width;

        const height = max_width/this.props.project.metadata.aspect_ratio;
        if( height<=max_height ) {
            return [parent_height, parent_width, height, max_width];
        }
        return [parent_height, parent_width, max_height, max_height*this.props.project.metadata.aspect_ratio];
    }

    componentDidMount() {
        this.setState({mounted: true});
    }

    get_display_info() { 
        return this.ref.current.getBoundingClientRect(); 
    }

    render() {
        if( !this.state.mounted ) { return <div></div>; }

        const [parent_height, parent_width, height, width] = this.project_dimensions();

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
                    get_display_info = {() => this.get_display_info()}
                    display={{
                        parent_width: width*this.props.parent_width,
                        parent_height: height*parent_width/parent_height*this.props.parent_height
                    }}                    
                    aspect_ratio={this.props.project.metadata.aspect_ratio}
                    points={this.props.project.whole_project.points}
                    access_point={this.props.project.access_point}
                >
                </NodeChain>
                
            </div>
        );
    }
}

export default RecursivePiecing;