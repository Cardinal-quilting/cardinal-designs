import { Component } from "react";

import RecursivePiecingNode from "./node";

class RecursivePiecing extends Component {
    render() {
        const [height, width] = this.props.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        const node_size = this.props.recursive_piecing_settings.node_size*Math.min(height, width);

        return (
            <div
            style={{
                position: "absolute",
                minWidth: width_px, 
                maxWidth: width_px,
                minHeight: height_px, 
                maxHeight: height_px,
            }}
            >
                <RecursivePiecingNode
                    x = {1}
                    y = {1}
                    project_height = {height}
                    project_width = {width}
                    size={node_size}
                    color={this.props.recursive_piecing_settings.node_color}
                />

                <RecursivePiecingNode
                x = {0}
                y = {1}
                    project_height = {height}
                    project_width = {width}
                    size={node_size}
                    color={this.props.recursive_piecing_settings.node_color}
                />

                <RecursivePiecingNode
                x = {1}
                y = {0}
                     project_height = {height}
                    project_width = {width}
                    size={node_size}
                    color={this.props.recursive_piecing_settings.node_color}
                />

                <RecursivePiecingNode
                x = {0}
                y = {0}
                     project_height = {height}
                    project_width = {width}
                    size={node_size}
                    color={this.props.recursive_piecing_settings.node_color}
                />
            </div>
        );
    }
}

export default RecursivePiecing;