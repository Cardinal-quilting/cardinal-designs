import { Component } from "react";

import BackgroundImageOptionsBox from "./background-image-options-box";
import RecursivePiecingOptionsBox from "./recursive-piecing/recursive-piecing-options-box";

class ProjectLeftMenu extends Component {
    render() {
        return ( 
            <div
            style={{
                maxWidth: String(this.props.width)+"vw",
                minWidth: String(this.props.width)+"vw",
            }}
            >
                <RecursivePiecingOptionsBox
                settings={this.props.settings}
                project_settings={this.props.project_settings}
                update_project_settings_element={this.props.update_project_settings_element}
                title="Paper piecing"
                width={0.95*this.props.width}
                initialize_recursive_piecing={this.props.initialize_recursive_piecing}
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