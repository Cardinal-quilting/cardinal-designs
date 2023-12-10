import { Component } from "react";

class ProjectNameDisplay extends Component {
    render() {
        return (
            <p
            style={{
                alignItems: "center", 
                justifyContent: "center",
                display: "flex",
                minWidth: this.props.width, 
                maxWidth: this.props.width,
                minHeight: this.props.height,
                maxHeight: this.props.height,
                color: this.props.settings.font_color,
                fontSize: String(this.props.settings.font_size)+"vmin",
                overflow: "hidden"
            }}
            >
                {this.props.project_name}
            </p>
        );
    }
}

export default ProjectNameDisplay;