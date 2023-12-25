import { Component } from "react";

class ProjectNameDisplay extends Component {
    render() {
        return (
            <div
            style={{
                minWidth: this.props.width, 
                maxWidth: this.props.width,
                minHeight: this.props.height,
                maxHeight: this.props.height,
                color: this.props.settings.font_color,
                fontSize: String(this.props.settings.font_size)+"vmin",
                overflowY: "auto",
                overflowX: "hidden"
            }}
            >
                {this.props.project_name}
            </div>
        );
    }
}

export default ProjectNameDisplay;