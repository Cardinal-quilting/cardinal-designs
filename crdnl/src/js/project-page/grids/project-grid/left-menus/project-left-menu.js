import { Component } from "react";

import BackgroundImageOptionsBox from "./background-image-options-box";
import RecursivePiecingOptionsBox from "./recursive-piecing-options-box";
import ProjectOptionsBox from "./project-options-box";

class ProjectLeftMenu extends Component {
    render() {
        return ( 
            <div
            style={{
                maxWidth: String(this.props.width)+"vw",
                minWidth: String(this.props.width)+"vw",
            }}
            >
                <ProjectOptionsBox
                settings={this.props.settings}
                project_settings={this.props.project_settings}
                update_project_settings_element={this.props.update_project_settings_element}
                set_project_settings={this.props.set_project_settings}
                title="Project options"
                width={0.95*this.props.width}
                />

                <RecursivePiecingOptionsBox
                settings={this.props.settings}
                project_settings={this.props.project_settings}
                update_project_settings_element={this.props.update_project_settings_element}
                title="Paper piecing"
                width={0.95*this.props.width}
                initialize_recursive_piecing={this.props.initialize_recursive_piecing}
                recursive_piecing_settings={this.props.recursive_piecing_settings}
                set_recursive_piecing_settings={this.props.set_recursive_piecing_settings}
                update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                />

                <BackgroundImageOptionsBox
                settings={this.props.settings}
                project_settings={this.props.project_settings}
                set_project_settings={this.props.set_project_settings}
                title="Background image"
                width={0.95*this.props.width}
                />
            </div>
        );
    }
}

export default ProjectLeftMenu;