import { Component } from "react";

import ProjectLeftMenu from "../main-displays/project/project-left-menu";

class LeftMenu extends Component {
    render() {
        const width = String(this.props.width) + "vw";
        return ( 
            <div
            style={{
                paddingLeft: "0.25vw",
                boxSizing: "border-box",
                minWidth: width, 
                maxWidth: width,
            }}
            >   
                <ProjectLeftMenu
                settings={this.props.settings}
                project_settings={this.props.project_settings}
                set_project_settings={this.props.set_project_settings}
                width={this.props.width}
                />
            </div>
        );
    }
}

export default LeftMenu;