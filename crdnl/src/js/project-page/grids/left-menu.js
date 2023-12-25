import { Component } from "react";

import ProjectLeftMenu from "../main-displays/project/project-left-menu";

class LeftMenu extends Component {
    render() {
        const width = String(this.props.width) + "vw";
        return ( 
            <div
            style={{
                minWidth: width, 
                maxWidth: width,
                overflowY: "auto",
                overflowX: "hidden",
            }}
            >   
                <ProjectLeftMenu
                settings={this.props.settings}
                project_settings={this.props.project_settings}
                set_project_settings={this.props.set_project_settings}
                update_project_settings_element={this.props.update_project_settings_element}
                width={this.props.width}
                initialize_recursive_piecing={this.props.initialize_recursive_piecing}
                />
            </div>
        );
    }
}

export default LeftMenu;