import { Component } from "react";

import BackgroundImageOptionsBox from "./background-image-options-box";

class ProjectLeftMenu extends Component {
    render() {
        return ( 
            <div
            style={{
                display: "grid",
                justifyContent: "center",
                maxWidth: String(this.props.width)+"vw",
                minWidth: String(this.props.width)+"vw",
            }}
            >
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