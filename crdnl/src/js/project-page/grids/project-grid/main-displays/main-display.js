import React, { Component } from "react";

import Project from "./project-display/project";
import RecursivePiecingTreeDisplay from "./recursive-piecing-tree-display/recursive-piecing-tree-display";

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

    content() {
        if( this.props.project_settings.main_display==="Project" ) {
            return (
                <Project
                    display_dimensions = {this.display_dimensions}
                    project_settings={this.props.project_settings}
                    set_project_settings={this.props.set_project_settings}
                    update_project_settings_element={this.props.update_project_settings_element}
                    recursive_piecing_settings={this.props.recursive_piecing_settings}
                    recursive_piecing_nodes={this.props.recursive_piecing_nodes}
                    recursive_piecing_lines={this.props.recursive_piecing_lines}
                    recursive_piecing_panels={this.props.recursive_piecing_panels}
                    update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                /> 
            );
        }

        if( this.props.project_settings.main_display==="Recursive piecing tree") {
            return (
                <RecursivePiecingTreeDisplay
                    display_dimensions = {this.display_dimensions}
                    settings={this.props.settings}
                    recursive_piecing_panels={this.props.recursive_piecing_panels}
                    recursive_piecing_settings={this.props.recursive_piecing_settings}
                    update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                />
            );
        }
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
                overflow: "hidden"
            }}
            >
                {this.state.mounted? this.content() : null}
            </div>
        );
    }
}

export default MainDisplay;
