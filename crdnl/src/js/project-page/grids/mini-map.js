import React, { Component } from "react";

import Project from "../main-displays/project/project";

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
                    project_info={this.props.project_info}
                    project_settings={this.props.project_settings}
                    display_scale_factor={this.props.project_display_factor} 
                    display_dimensions = {this.display_dimensions}
                    is_minimap={true}
                /> : null}
            </div> 
        );
    }
}

export default MiniMap;