import React, { Component } from "react";

import Project from "../main-displays/project/project";

import "css/project-page/grids/main-display.css"

class MainDisplay extends Component {
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
            <div className="main-display"
            ref={this.ref}
            style={{ 
                minWidth: width, 
                maxWidth: width,
                minHeight: this.props.height, 
                maxHeight: this.props.height,
                backgroundColor: this.props.settings.project_display_background_color,
                overflow: "hidden",
            }}
            >
                {this.state.mounted? 
                <Project
                display_dimensions = {this.display_dimensions}
                project_info = {this.props.project_info}
                project_settings={this.props.project_settings}
                /> : null}
            </div>
        );
    }
}

export default MainDisplay;
