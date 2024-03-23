import React, { Component } from "react";

import Project from "../project-grid/main-displays/project-display/project";

import "css/project-page/grids/mini-map.css"

class MiniMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mounted: false
        };

        this.ref = React.createRef()
        this.display_dimensions = this.display_dimensions.bind(this);
    }

    componentDidMount() {
        this.setState({mounted: true});
    }

    display_dimensions() {
        return [this.ref.current.getBoundingClientRect().height, this.ref.current.getBoundingClientRect().width];
    }

    render() {
        const width = String(this.props.width) + "vw";

        return (
            <div className="mini-map"
            ref={this.ref}
            style={{
                minWidth: width, 
                maxWidth: width,
                minHeight: this.props.height, 
                maxHeight: this.props.height,
                backgroundColor: this.props.settings.project_display_background_color,
                overflow: "hidden"
            }}
            >
                {this.state.mounted?
                <Project 
                    project_settings={this.props.project_settings}
                    display_dimensions = {this.display_dimensions}
                    display_scale_factor = {0.96}
                    is_minimap={true}
                    recursive_piecing_settings={this.props.recursive_piecing_settings}
                    recursive_piecing_nodes={this.props.recursive_piecing_nodes}
                    recursive_piecing_lines={this.props.recursive_piecing_lines}
                /> : null}
            </div> 
        );
    }
}

export default MiniMap;